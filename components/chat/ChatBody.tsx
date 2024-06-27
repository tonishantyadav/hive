import React from 'react'
import { ChatContent, ChatInput } from '@/components/chat'

export const ChatBody = ({
  serverId,
  channelId,
}: {
  serverId: string
  channelId: string
}) => {
  return (
    <div className="flex flex-grow flex-col">
      <ChatContent />
      <ChatInput serverId={serverId} channelId={channelId} />
    </div>
  )
}
