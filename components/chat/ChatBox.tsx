import { SheetBox } from '@/components/SheetBox'
import { ChatBody, ChatHeader } from '@/components/chat'
import { Channel, MemberRole, Server, User } from '@prisma/client'

export const ChatBox = ({
  user,
  server,
  channel,
  memberRole,
}: {
  user: User
  server: Server
  channel: Channel
  memberRole: MemberRole
}) => {
  return (
    <div className="flex flex-col divide-y">
      <div className="flex items-center justify-between gap-2 p-[0.480rem]">
        <ChatHeader
          channelName={channel.name}
          channelCategory={channel.channelCategory}
        />
        <SheetBox user={user} server={server} memberRole={memberRole} />
      </div>
      <ChatBody userId={user.id} serverId={server.id} channelId={channel.id} />
    </div>
  )
}
