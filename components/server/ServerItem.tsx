'use client'

import { cn } from '@/lib/utils'
import { Server } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export const ServerItem = ({ server }: { server: Server }) => {
  const searchParams = useSearchParams()
  const serverId = searchParams.get('server')

  return (
    <Link
      className="group relative flex h-10 w-10 gap-4 rounded-full"
      href={`/me?server=${server.id}`}
    >
      <div
        className={cn(
          'relative right-2 w-1 rounded-r-full bg-indigo-600 group-hover:inline-block lg:right-4',
          serverId !== server.id ? 'hidden' : ' '
        )}
      />
      <Image
        className="rounded-full hover:rounded-xl"
        fill
        src={server.imageUrl}
        alt="Channel"
      />
    </Link>
  )
}
