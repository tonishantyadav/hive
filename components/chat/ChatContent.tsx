'use client'

import { useMessages } from '@/hooks/chat'

export const ChatContent = ({ channelId }: { channelId: string }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMessages(channelId)
  return <div className="flex flex-grow rounded-lg p-3">Chat Content</div>
}
