import { channelIcon } from '@/components/channel/ChannelBox'
import { Channel, VisitedChannel } from '@prisma/client'
import { GhostIcon, HistoryIcon } from 'lucide-react'
import Link from 'next/link'
import { MdArrowOutward } from 'react-icons/md'

interface VisitedChannelWithChannel extends VisitedChannel {
  channel: Channel
}

export const VisitedChannelList = ({
  visitedChannels,
}: {
  visitedChannels: VisitedChannelWithChannel[]
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1 rounded-md border bg-secondary p-2">
        <HistoryIcon className="h-4 w-4" />
        <span>Recent</span>
      </div>
      {visitedChannels.length > 0 ? (
        visitedChannels.map((visitedChannel) => (
          <Link
            href={`/servers/${visitedChannel.serverId}/channels/${visitedChannel.channelId}`}
            className="flex w-fit flex-col gap-2 rounded-md px-2 text-sm text-zinc-300/80 hover:text-zinc-100"
            key={visitedChannel.id}
          >
            <div className="flex items-center gap-1">
              {channelIcon[visitedChannel.channel.channelCategory]('h-4 w-4')}
              <span>{visitedChannel.channel.name}</span>
              <MdArrowOutward className="h-4 w-4" />
            </div>
          </Link>
        ))
      ) : (
        <div className="mt-32 flex flex-col items-center justify-center text-zinc-600">
          <GhostIcon className="h-8 w-8" />
          <span className="text-md font-semibold">No recent visits</span>
        </div>
      )}
    </div>
  )
}
