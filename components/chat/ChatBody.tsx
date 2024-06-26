import React from 'react'
import { ChatContent, ChatInput } from '@/components/chat'

export const ChatBody = () => {
  return (
    <div className="flex flex-grow flex-col">
      <ChatContent />
      <ChatInput />
    </div>
  )
}
