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
    <div className="flex items-center gap-1">
      {channelIcon[channelCategory]('md:w-6 md:h-6 h-4 w-4 lg:h-6 lg:w-6')}
      <h1 className="text-xl font-semibold capitalize md:text-2xl lg:text-2xl">
        {channelName}
      </h1>
      <ChatNetworkStatus />
    </div>
  )
}
