import { channelIcon } from '@/components/channel/ChannelBox'
import { Channel, VisitedChannel } from '@prisma/client'
import { HistoryIcon } from 'lucide-react'
import Link from 'next/link'

interface VisitedChannelWithChannel extends VisitedChannel {
  channel: Channel
}

export const VisitedChannelList = ({
  visitedChannels,
}: {
  visitedChannels: VisitedChannelWithChannel[]
}) => {
  return (
    <div className="col m-2 flex flex-col gap-4">
      <div className="flex items-center justify-end gap-1 text-zinc-300/80">
        <HistoryIcon className="h-4 w-4" />
        <span className="">Recent</span>
      </div>
      {visitedChannels.length > 0 ? (
        visitedChannels.map((visitedChannel) => (
          <Link
            href={`/servers/${visitedChannel.serverId}/channels/${visitedChannel.channelId}`}
            className="flex w-fit flex-col gap-2 rounded-md hover:text-zinc-300/80 hover:underline"
            key={visitedChannel.id}
          >
            <div className="flex items-center gap-1">
              {channelIcon[visitedChannel.channel.channelCategory]('h-4 w-4')}
              <span>{visitedChannel.channel.name}</span>
            </div>
          </Link>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center">
          <HistoryIcon className="h-4 w-4" />
          <span>No recently visited channels found!</span>
        </div>
      )}
    </div>
  )
}
