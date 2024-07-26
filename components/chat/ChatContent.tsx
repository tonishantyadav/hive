'use client'

import { MemberWithUser } from '@/components/channel/ChannelBody'
import { ChatMessage } from '@/components/chat'
import { useMessages } from '@/hooks/chat'
import { useScroll } from '@/hooks/useScroll'
import { useScrollStore } from '@/stores/scroll'
import { Message } from '@prisma/client'
import { GhostIcon, Loader2Icon } from 'lucide-react'
import React, { useEffect } from 'react'

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
  const { containerRef, setCount } = useScrollStore()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useMessages(channelId)

  useScroll({
    hasNextPage,
    isFetchingNextPage,
    containerRef,
    fetchNextPage,
  })

  useEffect(() => {
    const count =
      data?.pages.reduce(
        (total, page) => total + page.messages.length + 1,
        0
      ) || 0
    setCount(count)
  }, [data, setCount])

  if (isPending)
    return (
      <div className="flex flex-grow flex-col items-center justify-center gap-1 text-zinc-400">
        <Loader2Icon className="h-5 w-5 animate-spin" />
        <span className="text-md">Loading...</span>
      </div>
    )

  if (!data && !isPending)
    return (
      <div className="flex flex-grow flex-col items-center justify-center gap-1 text-zinc-600">
        <GhostIcon className="h-14 w-14" />
        <span className="text-xl font-semibold">Nobody cooked here yet</span>
      </div>
    )

  return (
    <div
      ref={containerRef}
      className="hide-scrollbar h-0 flex-grow overflow-auto"
    >
      {isFetchingNextPage && (
        <div className="mt-2 flex justify-center text-zinc-400">
          <Loader2Icon className="h-4 w-4 animate-spin" />
        </div>
      )}
      <div className="flex flex-col-reverse">
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.messages.map((message: MessageWithMember) => (
              <ChatMessage
                userId={userId}
                serverId={serverId}
                channelId={channelId}
                message={message}
                key={message.id}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
