import { ChannelSearchBar } from '@/components/channel'
import prisma from '@/prisma/client'
import { Channel } from '@prisma/client'

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

  return (
    <div className="flex flex-1 flex-col p-1">
      <ChannelSearchBar
        textChannels={textChannels}
        voiceChannels={voiceChannels}
        videoChannels={videoChannels}
      />
    </div>
  )
}
