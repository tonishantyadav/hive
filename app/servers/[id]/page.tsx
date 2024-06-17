import prisma from '@/prisma/client'
import { notFound, redirect } from 'next/navigation'

const ServerPage = async ({ params }: { params: { id: string } }) => {
  const server = await prisma.server.findUnique({
    where: { id: params.id },
  })
  if (!server) notFound()

  const channels = await prisma.channel.findMany({
    where: {
      serverId: server.id,
    },
  })
  const channel = channels.find((channel) => channel.name === 'general')
  if (!channel) notFound()

  redirect(`/servers/${server.id}/channels/${channel.id}`)
}

export default ServerPage
