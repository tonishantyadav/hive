'use client'

import { ChatContent, ChatInput } from '@/components/chat'
import { useScrollStore } from '@/stores/scroll'
import { useRef } from 'react'

export interface ChatBodyProps {
  userId: string
  serverId: string
  channelId: string
}

export const ChatBody = ({ userId, serverId, channelId }: ChatBodyProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { containerRef: cf, setContainerRef } = useScrollStore()

  if (!cf) setContainerRef(containerRef)

  return (
    <div className="flex flex-grow flex-col">
      <ChatContent userId={userId} serverId={serverId} channelId={channelId} />
      <ChatInput userId={userId} serverId={serverId} channelId={channelId} />
    </div>
  )
}
