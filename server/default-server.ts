'use server'

import prisma from '@/prisma/client'

export async function getDefaultServer(email: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    console.log('User not found while retrieving the default server')
    return null
  }

  const server = await prisma.server.findFirst({
    where: {
      isDefault: true,
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  })
  if (!server) {
    console.log('Default server not found')
    return null
  }

  const channel = await prisma.channel.findFirst({
    where: {
      serverId: server.id,
      isDefault: true,
    },
  })
  if (!channel) {
    console.log('General channel not found for default server')
    return null
  }

  return {
    serverId: server.id,
    channelId: channel.id,
  }
}
