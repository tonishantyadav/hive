import React from 'react'
import { ChatContent, ChatInput } from '@/components/chat'

export const ChatBody = ({
  userId,
  serverId,
  channelId,
}: {
  userId: string
  serverId: string
  channelId: string
}) => {
  return (
    <div className="flex flex-grow flex-col">
      <ChatContent />
      <ChatInput userId={userId} serverId={serverId} channelId={channelId} />
    </div>
  )
}
