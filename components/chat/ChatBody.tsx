import { ChatContent, ChatInput } from '@/components/chat'

export interface ChatBodyProps {
  userId: string
  serverId: string
  channelId: string
}

export const ChatBody = ({ userId, serverId, channelId }: ChatBodyProps) => {
  return (
    <div className="flex flex-grow flex-col">
      <ChatContent userId={userId} channelId={channelId} />
      <ChatInput userId={userId} serverId={serverId} channelId={channelId} />
    </div>
  )
}
