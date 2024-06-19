import { ChannelBody, ChannelFooter, ChannelHeader } from '@/components/channel'
import { ChannelCategory, Server, UserRole } from '@prisma/client'
import { HashIcon, MicIcon, VideoIcon } from 'lucide-react'
import { ReactNode } from 'react'

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

export const channelIcon: Record<
  ChannelCategory,
  (className: string) => ReactNode
> = {
  [ChannelCategory.TEXT]: (className: string) => (
    <HashIcon className={className} />
  ),
  [ChannelCategory.VOICE]: (className: string) => (
    <MicIcon className={className} />
  ),
  [ChannelCategory.VIDEO]: (className: string) => (
    <VideoIcon className={className} />
  ),
}
