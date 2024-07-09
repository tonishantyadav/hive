'use client'

import { MemberWithUser } from '@/components/channel/ChannelBody'
import { ChatMessage } from '@/components/chat'
import { useMessages } from '@/hooks/chat'
import { Message } from '@prisma/client'
import { Loader2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface MessageWithMember extends Message {
  member: MemberWithUser
}

export const ChatContent = ({ channelId }: { channelId: string }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useMessages(channelId)
  const [messages, setMessages] = useState<MessageWithMember[]>([])

  useEffect(() => {
    if (data && data.pages) {
      const allMessages = data.pages.flatMap((page) => page.messages)
      setMessages(allMessages)
    }
  }, [data])

  console.log(messages)

  return (
    <div className="flex flex-grow flex-col-reverse gap-2 rounded-lg px-3 py-5">
      {isPending && <Loader2Icon className="h-4 w-4 animate-spin" />}
      {messages && messages.length > 0 && (
        <>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
        </>
      )}
    </div>
  )
}
