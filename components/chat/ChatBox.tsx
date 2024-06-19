import { SheetBox } from '@/components/SheetBox'
import { Channel, Server, UserRole } from '@prisma/client'
import { channelIcon } from '@/components/channel/ChannelBox'

export const ChatBox = ({
  server,
  channel,
  userRole,
}: {
  server: Server
  channel: Channel
  userRole: UserRole
}) => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex items-center gap-2">
        <div className="md:hidden lg:hidden">
          <SheetBox server={server} userRole={userRole} />
        </div>
        <div className="flex items-center gap-1">
          {channelIcon[channel.channelCategory](
            'md:w-6 md:h-6 h-4 w-4 lg:h-6 lg:w-6'
          )}
          <h1 className="font-semibold capitalize md:text-2xl lg:text-2xl">
            {channel.name}
          </h1>
        </div>
      </div>
      <div className="flex flex-col">Chat Box</div>
    </div>
  )
}
