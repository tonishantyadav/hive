import { ChannelList, ChannelSearchBar } from '@/components/channel'
import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs/server'
import { Channel, User } from '@prisma/client'

export interface TextChannel extends Omit<Channel, 'channelCategory'> {
  channelCategory: 'TEXT'
}

export interface VoiceChannel extends Omit<Channel, 'channelCategory'> {
  channelCategory: 'VOICE'
}

export interface VideoChannel extends Omit<Channel, 'channelCategory'> {
  channelCategory: 'VIDEO'
}

export const ChannelBody = async ({
  serverId,
  isDefault,
}: {
  serverId: string
  isDefault: boolean
}) => {
  const channels = await prisma.channel.findMany({
    where: { serverId },
  })
  const textChannels: TextChannel[] = channels.filter(
    (channel): channel is TextChannel => channel.channelCategory === 'TEXT'
  )
  const voiceChannels: VoiceChannel[] = channels.filter(
    (channel): channel is VoiceChannel => channel.channelCategory === 'VOICE'
  )
  const videoChannels: VideoChannel[] = channels.filter(
    (channel): channel is VideoChannel => channel.channelCategory === 'VIDEO'
  )

  const members = await prisma.member.findMany({
    where: { serverId },
  })
  const users = await Promise.all(
    members.map((member) =>
      prisma.user.findUnique({
        where: {
          id: member.userId,
        },
      })
    )
  )

  const filteredMembers = users.filter((user): user is User => user !== null)
  const { userId: clerkUserId } = auth()

  return (
    <div className="flex h-0 flex-grow flex-col gap-2 p-1">
      <ChannelSearchBar
        members={filteredMembers}
        textChannels={textChannels}
        voiceChannels={voiceChannels}
        videoChannels={videoChannels}
      />
      <ChannelList
        members={filteredMembers.filter(
          (member) => member.clerkUserId !== clerkUserId
        )}
        textChannels={textChannels}
        voiceChannels={voiceChannels}
        videoChannels={videoChannels}
      />
    </div>
  )
}
