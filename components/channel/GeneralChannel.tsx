import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { HomeIcon, LockIcon, PinIcon } from 'lucide-react'
import Link from 'next/link'

export const GeneralChannel = ({
  serverId,
  channelId,
  channelName,
}: {
  serverId: string
  channelId: string
  channelName: string
}) => {
  return (
    <Link
      href={`/servers/${serverId}/channels/${channelId}`}
      className={cn(
        'group mt-2 flex items-center justify-between rounded-md border p-2.5'
      )}
    >
      <div
        className={cn(
          'group flex w-full items-center gap-1 rounded-md capitalize text-neutral-300 hover:text-neutral-100'
        )}
      >
        <PinIcon className="h-4 w-4" />
        <span className="text-md font-medium">{channelName}</span>
      </div>
      <LockIcon className="h-4 w-4 text-neutral-400 group-hover:text-neutral-100" />
    </Link>
  )
}
