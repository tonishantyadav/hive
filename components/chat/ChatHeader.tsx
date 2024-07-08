import { channelIcon } from '@/components/channel/ChannelBox'
import { ChatNetworkStatus } from '@/components/chat'
import { ChannelCategory } from '@prisma/client'

export const ChatHeader = ({
  channelName,
  channelCategory,
}: {
  channelName: string
  channelCategory: ChannelCategory
}) => {
  return (
    <div className="flex items-center justify-between gap-1">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900">
        {' '}
        {channelIcon[channelCategory]('w-4 h-4')}
      </div>
      <h1 className="text-xl font-semibold capitalize md:text-2xl lg:text-2xl">
        Welcome to {channelName}
      </h1>
      <ChatNetworkStatus />
    </div>
  )
}
