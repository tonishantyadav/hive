import { ChannelBox } from '@/components/channel'
import { ChatBox } from '@/components/chat'
import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'

const ChannelPage = async ({
  params,
}: {
  params: { id: string; channelId: string }
}) => {
  const { userId: clerkUserId } = auth()
  if (!clerkUserId) redirect('/')

  const user = await prisma.user.findUnique({ where: { clerkUserId } })
  if (!user) redirect('/')

  const server = await prisma.server.findUnique({ where: { id: params.id } })
  if (!server) notFound()

  const channel = await prisma.channel.findUnique({
    where: { serverId: params.id, id: params.channelId },
  })
  if (!channel) notFound()

  return (
    <div className="grid h-full divide-x md:grid-cols-[300px,1fr] lg:grid-cols-[300px,1fr]">
      <div className="hidden flex-col gap-2 md:flex lg:flex">
        <ChannelBox server={server} userRole={user.userRole} />
      </div>
      <ChatBox server={server} channel={channel} userRole={user.userRole} />
    </div>
  )
}

export default ChannelPage
