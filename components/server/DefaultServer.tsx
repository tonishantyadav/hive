'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const DefaultServer = ({
  serverId,
  serverName,
  serverImage,
  channelId,
}: {
  serverId: string
  serverName: string
  serverImage: string | null
  channelId: string
}) => {
  const pathname = usePathname()

  const isDefault = pathname ? pathname.includes(serverId) : false

  return (
    <Link
      href={`/servers/${serverId}/channels/${channelId}`}
      className="group relative flex h-10 w-10 gap-4 rounded-full"
    >
      {serverImage ? (
        <>
          <div
            className={cn(
              'relative right-3 w-1 rounded-full bg-white group-hover:inline-block',
              !isDefault ? 'hidden' : ''
            )}
          />{' '}
          <Image
            className="rounded-full hover:rounded-xl"
            fill
            src={serverImage}
            alt="Default server image"
            sizes="33vw"
          />
        </>
      ) : (
        <Avatar className="h-10 w-10">
          <AvatarFallback>{serverName[0]}</AvatarFallback>
        </Avatar>
      )}
    </Link>
  )
}
