import React from 'react'
import { ChatContent, ChatFooter, ChatInput } from '@/components/chat'
import { string } from 'zod'

export interface ChatBodyProps {
  userId: string
  serverId: string
  channelId: string
  channelName: string
}

export const ChatBody = ({
  userId,
  serverId,
  channelId,
  channelName,
}: ChatBodyProps) => {
  return (
    <div className="flex flex-grow flex-col">
      <ChatContent />
      <ChatFooter
        userId={userId}
        serverId={serverId}
        channelId={channelId}
        channelName={channelName}
      />
    </div>
  )
}
