import { ChannelBody, ChannelFooter, ChannelHeader } from '@/components/channel'
import {
  ChannelCategory,
  Member,
  MemberRole,
  Server,
  User,
} from '@prisma/client'
import { HashIcon, MicIcon, VideoIcon } from 'lucide-react'
import { ReactNode } from 'react'

export const ChannelBox = ({
  user,
  server,
  memberId,
  memberRole,
}: {
  user: User
  server: Server
  memberId: string
  memberRole: MemberRole
}) => {
  return (
    <>
      <ChannelHeader server={server} memberRole={memberRole} />
      <ChannelBody
        userId={user.id}
        memberId={memberId}
        serverId={server.id}
        serverDefault={server.isDefault}
      />
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
