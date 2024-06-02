'use client'

import { cn } from '@/lib/utils'
import { Server } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export const ServerItem = ({
  serverId,
  serverImageUrl,
}: {
  serverId: string
  serverImageUrl: string
}) => {
  const params = useParams()
  return (
    <Link
      className="group relative flex h-10 w-10 gap-4 rounded-full"
      href={`/servers/${serverId}`}
    >
      <div
        className={cn(
          'relative right-4 w-1 rounded-full bg-white group-hover:inline-block',
          params.id !== serverId ? 'hidden' : ' '
        )}
      />
      <Image
        className="rounded-full hover:rounded-xl"
        fill
        src={serverImageUrl}
        alt="Server image"
      />
    </Link>
  )
}
