import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { HomeIcon, PinIcon } from 'lucide-react'
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
    <Link href={`/servers/${serverId}/channels/${channelId}`}>
      <Button
        className={cn(
          'group flex w-full items-center justify-start gap-1 rounded-full py-2 capitalize text-zinc-300',
          channelName === 'general' ? 'bg-zinc-800' : ''
        )}
        variant="ghost"
      >
        <PinIcon className="h-4 w-4 text-indigo-400" />
        <span className="text-sm">{channelName}</span>
      </Button>
    </Link>
  )
}
