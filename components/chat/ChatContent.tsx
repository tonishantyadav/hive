'use client'

import { MemberWithUser } from '@/components/channel/ChannelBody'
import { ChatMessage } from '@/components/chat'
import { useMessages } from '@/hooks/chat'
import { Message } from '@prisma/client'
import { GhostIcon, Loader2Icon, LoaderIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface MessageWithMember extends Message {
  member: MemberWithUser
}

export const ChatContent = ({
  userId,
  channelId,
}: {
  userId: string
  channelId: string
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useMessages(channelId)
  const [messages, setMessages] = useState<MessageWithMember[]>([])

  useEffect(() => {
    if (data && data.pages) {
      const allMessages = data.pages.flatMap((page) => page.messages)
      setMessages(allMessages)
    }
  }, [data])

  if (isPending)
    return (
      <div className="flex flex-grow flex-col items-center justify-center gap-1">
        <Loader2Icon className="h-5 w-5 animate-spin" />
        <span className="text-md text-zinc-400">Loading...</span>
      </div>
    )

  if (messages && !messages[0] && !isPending)
    return (
      <div className="flex flex-grow flex-col items-center justify-center gap-1">
        <GhostIcon className="h-14 w-14 text-zinc-600" />
        <span className="text-xl font-semibold text-zinc-600">
          Nobody cooked here yet!
        </span>
      </div>
    )

  return (
    <>
      <div className="flex flex-grow flex-col-reverse gap-2 rounded-lg px-3 py-5">
        {isPending && <Loader2Icon className="h-4 w-4 animate-spin" />}
        {messages && messages[0] && (
          <>
            {messages.map((message) => (
              <ChatMessage userId={userId} message={message} key={message.id} />
            ))}
          </>
        )}
      </div>
    </>
  )
}
