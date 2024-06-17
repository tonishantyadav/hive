'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'

export const ServerItem = ({
  serverId,
  serverName,
  serverImageUrl,
  channelId,
}: {
  serverId: string
  serverName: string
  serverImageUrl: string | null
  channelId: string | undefined
}) => {
  if (!channelId) notFound()
  const params = useParams()

  return (
    <Link
      className="group flex"
      href={`/servers/${serverId}/channels/${channelId}`}
    >
      <div
        className={cn(
          'relative right-2 w-1 rounded-full bg-white group-hover:inline-block',
          params.id !== serverId ? 'hidden' : ' '
        )}
      />
      <Avatar className="h-10 w-10">
        {serverImageUrl && <AvatarImage src={serverImageUrl} />}
        <AvatarFallback>{serverName[0]}</AvatarFallback>
      </Avatar>
    </Link>
  )
}
