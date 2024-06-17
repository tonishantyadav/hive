import {
  ChannelList,
  ChannelSearchBar,
  GeneralChannel,
} from '@/components/channel'
import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs/server'
import { Channel, User } from '@prisma/client'
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

export const ChannelBody = async ({ serverId }: { serverId: string }) => {
  const channels = await prisma.channel.findMany({
    where: { serverId },
  })

  const generalChannel = channels.find((channel) => channel.name === 'general')
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
      <GeneralChannel
        serverId={serverId}
        channelId={generalChannel.id}
        channelName={generalChannel.name}
      />
      <ChannelList
        serverId={serverId}
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
