import { ChatInput } from '@/components/chat'
import { ChatBodyProps } from '@/components/chat/ChatBody'

export const ChatFooter = ({ userId, serverId, channelId }: ChatBodyProps) => {
  return (
    <div className="flex flex-col">
      <ChatInput userId={userId} serverId={serverId} channelId={channelId} />
    </div>
  )
}
