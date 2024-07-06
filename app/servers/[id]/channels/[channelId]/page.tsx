import { auth } from '@/auth'
import { ChannelBox } from '@/components/channel'
import { ChatBox } from '@/components/chat'
import prisma from '@/prisma/client'
import { notFound, redirect } from 'next/navigation'

const ChannelPage = async ({
  params,
}: {
  params: { id: string; channelId: string }
}) => {
  const session = await auth()
  if (!session || !session.user) redirect('/')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  })
  if (!user) redirect('/')

  const server = await prisma.server.findUnique({ where: { id: params.id } })
  if (!server) notFound()

  const channel = await prisma.channel.findUnique({
    where: { serverId: params.id, id: params.channelId },
  })
  if (!channel) notFound()

  const member = await prisma.member.findFirst({
    where: { userId: user.id, serverId: server.id },
  })
  if (!member) notFound()

  return (
    <div className="grid h-full divide-x md:grid-cols-[300px,1fr] lg:grid-cols-[300px,1fr]">
      <div className="hidden flex-col gap-2 md:flex lg:flex">
        <ChannelBox
          user={user}
          server={server}
          memberRole={member.memberRole}
        />
      </div>
      <ChatBox
        user={user}
        server={server}
        channel={channel}
        memberRole={member.memberRole}
      />
    </div>
  )
}

export default ChannelPage
