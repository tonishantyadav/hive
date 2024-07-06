import { ChannelBody, ChannelFooter, ChannelHeader } from '@/components/channel'
import { ChannelCategory, MemberRole, Server, User } from '@prisma/client'
import { HashIcon, MicIcon, VideoIcon } from 'lucide-react'
import { ReactNode } from 'react'

export const ChannelBox = ({
  user,
  server,
  memberRole,
}: {
  user: User
  server: Server
  memberRole: MemberRole
}) => {
  return (
    <>
      <ChannelHeader server={server} memberRole={memberRole} />
      <ChannelBody userId={user.id} serverId={server.id} />
      <ChannelFooter user={user} memberRole={memberRole} />
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
