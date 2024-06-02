import { ChannelBody, ChannelHeader } from '@/components/channel'
import { Server, UserRole } from '@prisma/client'

export const ChannelBox = ({
  server,
  userRole,
}: {
  server: Server
  userRole: UserRole
}) => {
  return (
    <>
      <div className="hidden flex-col gap-2 md:inline-flex lg:inline-flex">
        <ChannelHeader server={server} userRole={userRole} />
        <ChannelBody />
      </div>
    </>
  )
}
