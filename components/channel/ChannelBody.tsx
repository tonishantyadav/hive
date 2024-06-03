import { ChannelList, ChannelSearchBar } from '@/components/channel'
import prisma from '@/prisma/client'
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

export const ChannelBody = async ({ serverId }: { serverId: string }) => {
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

  const serverMembers = await prisma.serverMember.findMany({
    where: { serverId },
  })
  const users = await Promise.all(
    serverMembers.map((serverMember) =>
      prisma.user.findUnique({
        where: {
          id: serverMember.userId,
        },
      })
    )
  )

  const members = users.filter((user): user is User => user !== null)

  return (
    <div className="flex h-0 flex-grow flex-col gap-2 p-1">
      <ChannelSearchBar
        members={members}
        textChannels={textChannels}
        voiceChannels={voiceChannels}
        videoChannels={videoChannels}
      />
      <ChannelList
        members={members}
        textChannels={textChannels}
        voiceChannels={voiceChannels}
        videoChannels={videoChannels}
      />
    </div>
  )
}
