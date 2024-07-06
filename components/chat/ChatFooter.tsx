import React from 'react'
import { ChatWelcomeMessage } from './ChatWelcomeMessage'
import { ChatInput } from './ChatInput'
import { ChatBodyProps } from './ChatBody'

export const ChatFooter = ({
  userId,
  serverId,
  channelId,
  channelName,
}: ChatBodyProps) => {
  return (
    <div className="flex flex-col gap-3">
      <ChatWelcomeMessage channelName={channelName} />
      <ChatInput userId={userId} serverId={serverId} channelId={channelId} />
    </div>
  )
}
