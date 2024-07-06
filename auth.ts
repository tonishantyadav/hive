import prisma from '@/prisma/client'
import { randImage, randName } from '@/utils/random'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import authConfig from './auth.config'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/signin',
  },
  events: {
    // Verify the user that uses oAuth signin
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })

      const name = await randName()
      const image = await randImage(name)

      const result = await prisma.$transaction(
        async (db) => {
          const server = await db.server.create({
            data: { name, image, isDefault: true },
          })
          if (!server) return false

          const channel = await db.channel.create({
            data: {
              serverId: server.id,
              name: 'general',
              isDefault: true,
            },
          })
          if (!channel) return false

          const member = await db.member.create({
            data: {
              userId: user.id!,
              serverId: server.id,
              memberRole: 'ADMIN',
            },
          })
          if (!member) return false

          return true
        },
        {
          maxWait: Number.MAX_SAFE_INTEGER,
          timeout: Number.MAX_SAFE_INTEGER,
        }
      )
      if (!result) {
        await prisma.account.delete({ where: { id: user.id } })
        await prisma.user.delete({ where: { id: user.id } })
      }
    },
  },
  ...authConfig,
})
