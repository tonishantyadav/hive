import { ChannelBody, ChannelHeader, ChannelFooter } from '@/components/channel'
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
      <ChannelHeader server={server} userRole={userRole} />
      <ChannelBody serverId={server.id} />
      <ChannelFooter />
    </>
  )
}
