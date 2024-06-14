'use client'

import {
  TextChannel,
  VideoChannel,
  VoiceChannel,
} from '@/components/channel/ChannelBody'
import { memberRoleIconMap } from '@/components/channel/ChannelFooter'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useModalStore } from '@/stores/modal'
import { User } from '@prisma/client'
import {
  Edit,
  Hash,
  HashIcon,
  MicIcon,
  PlusIcon,
  Settings,
  Trash2,
  Trash2Icon,
  UserRoundIcon,
  VideoIcon,
} from 'lucide-react'

interface ChannelListProps {
  members: User[]
  textChannels: TextChannel[]
  voiceChannels: VoiceChannel[]
  videoChannels: VideoChannel[]
}

export const ChannelList = ({
  members,
  textChannels,
  voiceChannels,
  videoChannels,
}: ChannelListProps) => {
  const { setChannel, onOpen } = useModalStore()

  return (
    <ScrollArea>
      <div className="flex flex-col gap-5 p-4">
        <div>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium leading-none">TEXT CHANNELS</h4>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => onOpen('CREATE_TEXT_CHANNEL')}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          {textChannels.length > 0 ? (
            <>
              {textChannels.map((textChannel) => (
                <Button
                  className="group flex w-full items-center justify-between gap-1 py-2 text-zinc-300"
                  key={textChannel.id}
                  variant="ghost"
                >
                  <div className="flex items-center gap-1">
                    <Hash className="h-4 w-4" />
                    <span className="text-sm">{textChannel.name}</span>
                  </div>
                  <div className="hidden items-center gap-1 group-hover:inline-flex">
                    <Edit className="h-4 w-4" />
                    <Trash2Icon
                      className="h-4 w-4"
                      onClick={() => {
                        setChannel(textChannel)
                        onOpen('DELETE_CHANNEL')
                      }}
                    />
                  </div>
                </Button>
              ))}
            </>
          ) : (
            <div className="my-8 flex h-full flex-col items-center justify-center gap-1 text-zinc-500">
              <HashIcon className="h-6 w-6" />
              <span className="text-xs font-medium">
                No text channels found
              </span>
            </div>
          )}
        </div>
        <Separator />
        <div>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium leading-none">VOICE CHANNELS</h4>
            <Button variant="ghost" size="icon" className="rounded-full">
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          {voiceChannels.length > 0 ? (
            <>
              {voiceChannels.map((voiceChannel) => (
                <Button
                  className="group flex w-full items-center justify-between gap-1 py-2 text-zinc-300"
                  key={voiceChannel.id}
                  variant="ghost"
                >
                  <div className="flex items-center gap-1">
                    <MicIcon className="h-4 w-4" />
                    <span className="text-sm">{voiceChannel.name}</span>
                  </div>
                  <div className="hidden items-center gap-1 group-hover:inline-flex">
                    <Edit className="h-4 w-4" />
                    <Trash2Icon
                      className="h-4 w-4"
                      onClick={() => {
                        setChannel(voiceChannel)
                        onOpen('DELETE_CHANNEL')
                      }}
                    />
                  </div>
                </Button>
              ))}
            </>
          ) : (
            <div className="my-8 flex h-full flex-col items-center justify-center gap-1 text-zinc-500">
              <MicIcon className="h-6 w-6" />
              <span className="text-xs font-medium">
                No voice channels found
              </span>
            </div>
          )}
        </div>
        <Separator />
        <div>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium leading-none">VIDEO CHANNELS</h4>
            <Button variant="ghost" size="icon" className="rounded-full">
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          {videoChannels.length > 0 ? (
            <>
              {videoChannels.map((videoChannel) => (
                <Button
                  className="group flex w-full items-center justify-between gap-1 py-2 text-zinc-300"
                  key={videoChannel.id}
                  variant="ghost"
                >
                  <div className="flex items-center gap-1">
                    <VideoIcon className="h-4 w-4" />
                    <span className="text-sm">{videoChannel.name}</span>
                  </div>
                  <div className="hidden items-center gap-1 group-hover:inline-flex">
                    <Edit className="h-4 w-4" />
                    <Trash2Icon
                      className="h-4 w-4"
                      onClick={() => {
                        setChannel(videoChannel)
                        onOpen('DELETE_CHANNEL')
                      }}
                    />
                  </div>
                </Button>
              ))}
            </>
          ) : (
            <div className="my-8 flex h-full flex-col items-center justify-center gap-1 text-zinc-500">
              <VideoIcon className="h-6 w-6" />
              <span className="text-xs font-medium">
                No video channels found
              </span>
            </div>
          )}
        </div>
        <Separator />
        <div>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium leading-none">MEMBERS</h4>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-4 w-4" />
            </Button>
          </div>{' '}
          {members.length > 0 ? (
            <>
              {members.map((member) => (
                <Button
                  key={member.id}
                  variant="ghost"
                  className="group flex w-full items-center justify-between gap-1 py-2 text-zinc-300"
                >
                  <div className="flex items-center gap-1">
                    {memberRoleIconMap[member.userRole]}
                    <span className="text-sm">{member.name}</span>
                  </div>
                  <div className="hidden gap-1 group-hover:inline-flex">
                    <Edit className="h-4 w-4" />
                    <Trash2 className="h-4 w-4" />
                  </div>
                </Button>
              ))}
            </>
          ) : (
            <div className="my-8 flex h-full flex-col items-center justify-center gap-1 text-zinc-500">
              <UserRoundIcon className="h-6 w-6" />
              <span className="text-xs font-medium">No members found</span>
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  )
}
