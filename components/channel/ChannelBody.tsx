import {
  ChannelList,
  ChannelSearchBar,
  GeneralChannel,
  VisitedChannelList,
} from '@/components/channel'
import prisma from '@/prisma/client'
import { Channel, Member, User } from '@prisma/client'
import { notFound } from 'next/navigation'

export interface TextChannel extends Omit<Channel, 'channelCategory'> {
  channelCategory: 'TEXT'
}

export interface VoiceChannel extends Omit<Channel, 'channelCategory'> {
  channelCategory: 'VOICE'
}

export interface VideoChannel extends Omit<Channel, 'channelCategory'> {
  channelCategory: 'VIDEO'
}

export interface MemberWithUser extends Member {
  user: User
}

export const ChannelBody = async ({
  userId,
  memberId,
  serverId,
}: {
  userId: string
  memberId: string
  serverId: string
}) => {
  const channels = await prisma.channel.findMany({
    where: { serverId },
  })

  const visitedChannels = await prisma.visitedChannel.findMany({
    where: { memberId },
    orderBy: {
      visitedAt: 'desc',
    },
    include: {
      channel: true,
    },
  })

  const members = await prisma.member.findMany({
    where: { serverId },
    include: { user: true },
  })

  const generalChannel = channels.find((channel) => channel.isDefault)
  if (!generalChannel) notFound()

  const filteredChannels = channels.filter(
    (channel) => channel.id !== generalChannel.id
  )

  const textChannels: TextChannel[] = filteredChannels.filter(
    (channel): channel is TextChannel => channel.channelCategory === 'TEXT'
  )

  const voiceChannels: VoiceChannel[] = filteredChannels.filter(
    (channel): channel is VoiceChannel => channel.channelCategory === 'VOICE'
  )

  const videoChannels: VideoChannel[] = filteredChannels.filter(
    (channel): channel is VideoChannel => channel.channelCategory === 'VIDEO'
  )

  const filteredMembers = members.filter((member) => member.userId !== userId)

  return (
    <div className="flex h-0 flex-grow flex-col gap-2 p-1">
      <ChannelSearchBar
        members={filteredMembers}
        textChannels={textChannels}
        voiceChannels={voiceChannels}
        videoChannels={videoChannels}
      />
      <GeneralChannel
        serverId={serverId}
        channelId={generalChannel.id}
        channelName={generalChannel.name}
      />
      {true ? (
        <VisitedChannelList visitedChannels={visitedChannels} />
      ) : (
        <ChannelList
          serverId={serverId}
          members={filteredMembers}
          textChannels={textChannels}
          voiceChannels={voiceChannels}
          videoChannels={videoChannels}
        />
      )}
    </div>
  )
}
