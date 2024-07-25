'use client'

import { MemberWithUser } from '@/components/channel/ChannelBody'
import { ChatMessage } from '@/components/chat'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useMessages } from '@/hooks/chat'
import { Message } from '@prisma/client'
import { GhostIcon, Loader2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { MdArrowOutward } from 'react-icons/md'

export interface MessageWithMember extends Message {
  member: MemberWithUser
}

export const ChatContent = ({
  userId,
  serverId,
  channelId,
}: {
  userId: string
  serverId: string
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
      <div className="flex flex-grow flex-col items-center justify-center gap-1 text-zinc-400">
        <Loader2Icon className="h-5 w-5 animate-spin" />
        <span className="text-md">Loading...</span>
      </div>
    )

  if (messages && !messages[0] && !isPending)
    return (
      <div className="flex flex-grow flex-col items-center justify-center gap-1 text-zinc-600">
        <GhostIcon className="h-14 w-14" />
        <span className="text-xl font-semibold ">Nobody cooked here yet</span>
      </div>
    )

  return (
    <ScrollArea className="h-0 flex-grow">
      {hasNextPage && (
        <div className="my-2 flex cursor-pointer justify-center">
          {isFetchingNextPage ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            <Badge
              className="flex items-center gap-1 text-xs"
              variant="secondary"
              onClick={() => fetchNextPage()}
            >
              <span>Old Messages</span>
              <MdArrowOutward className="h-4 w-4" />
            </Badge>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse">
        {isPending && <Loader2Icon className="h-4 w-4 animate-spin" />}
        {messages && messages[0] && (
          <>
            {messages.reverse().map((message) => (
              <ChatMessage
                userId={userId}
                serverId={serverId}
                channelId={channelId}
                message={message}
                key={message.id}
              />
            ))}
          </>
        )}
      </div>
    </ScrollArea>
  )
}
