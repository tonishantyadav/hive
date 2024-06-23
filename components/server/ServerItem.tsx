'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
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
      className="group relative flex h-10 w-10 gap-4 rounded-full"
      href={`/servers/${serverId}/channels/${channelId}`}
    >
      <div
        className={cn(
          'relative right-3 w-1 rounded-full bg-white group-hover:inline-block',
          params && params.id !== serverId ? 'hidden' : ''
        )}
      />
      {serverImageUrl && (
        <Image
          className="rounded-full hover:rounded-xl"
          fill
          src={serverImageUrl}
          alt="Server image"
          sizes="33vw"
        />
      )}
    </Link>
  )
}
