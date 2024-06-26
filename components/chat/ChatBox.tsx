import { SheetBox } from '@/components/SheetBox'
import { ChatBody, ChatHeader } from '@/components/chat'
import { Channel, Server, UserRole } from '@prisma/client'

export const ChatBox = ({
  server,
  channel,
  userRole,
}: {
  server: Server
  channel: Channel
  userRole: UserRole
}) => {
  return (
    <div className="flex flex-col divide-y">
      <div className="flex items-center justify-between gap-2 p-[0.480rem]">
        <ChatHeader
          channelName={channel.name}
          channelCategory={channel.channelCategory}
        />
        <SheetBox server={server} userRole={userRole} />
      </div>
      <ChatBody />
    </div>
  )
}
