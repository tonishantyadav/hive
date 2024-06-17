import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const ServersPage = async () => {
  const { userId: clerkUserId } = auth()
  if (!clerkUserId) redirect('/')

  const user = await prisma.user.findUnique({ where: { clerkUserId } })
  if (!user) redirect('/')

  const server = await prisma.server.findFirst({
    where: {
      isDefault: true,
      member: {
        some: {
          userId: user.id,
        },
      },
    },
  })
  if (!server) redirect('/')

  const channel = await prisma.channel.findFirst({
    where: {
      serverId: server.id,
      name: 'general',
    },
  })
  if (!channel) redirect('/')

  redirect(`/servers/${server.id}/channels/${channel.id}`)
}

export default ServersPage
