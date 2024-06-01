import { ChannelBody, ChannelHeader } from '@/components/channel'
import { Server, User } from '@prisma/client'

export const ChannelContainer = ({
  server,
  user,
}: {
  server: Server
  user: User
}) => {
  return (
    <>
      <div className="hidden h-full w-[300px] flex-col gap-2 border-l border-r md:inline-flex lg:inline-flex">
        <ChannelHeader server={server} userRole={user.userRole} />
        <ChannelBody />
      </div>
    </>
  )
}
