import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'

const ServersPage = async () => {
  const { userId: clerkUserId } = auth()
  if (!clerkUserId) redirect('/')

  const user = await prisma.user.findUnique({ where: { clerkUserId } })
  if (!user) redirect('/')

  const defaultServer = await prisma.server.findFirst({
    where: {
      isDefault: true,
      member: {
        some: {
          userId: user.id,
        },
      },
    },
  })
  if (!defaultServer) notFound()

  const generalChannel = await prisma.channel.findFirst({
    where: {
      serverId: defaultServer.id,
    },
  })
  if (!generalChannel) notFound()

  redirect(`/servers/${defaultServer.id}/channels/${generalChannel.id}`)
}

export default ServersPage
