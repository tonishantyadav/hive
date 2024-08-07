'use client'

import {
  MemberWithUser,
  TextChannel,
  VideoChannel,
  VoiceChannel,
} from '@/components/channel/ChannelBody'
import { memberRoleIconRecord } from '@/components/channel/ChannelFooter'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useConversationCreate } from '@/hooks/conversation/useConversationCreate'
import { useModalStore } from '@/stores/modal'
import {
  Hash,
  HashIcon,
  Loader2Icon,
  MicIcon,
  PencilIcon,
  PlusIcon,
  Settings,
  Trash2Icon,
  UserRoundIcon,
  VideoIcon,
} from 'lucide-react'
import Link from 'next/link'

interface ChannelListProps {
  memberId: string
  serverId: string
  members: MemberWithUser[]
  textChannels: TextChannel[]
  voiceChannels: VoiceChannel[]
  videoChannels: VideoChannel[]
}

export const ChannelList = ({
  memberId,
  serverId,
  members,
  textChannels,
  voiceChannels,
  videoChannels,
}: ChannelListProps) => {
  const conversationCreate = useConversationCreate()
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
                    <Link
                      href={`/servers/${serverId}/channels/${textChannel.id}`}
                      className="text-sm hover:underline"
                    >
                      {textChannel.name}
                    </Link>
                  </div>
                  <div className="hidden items-center gap-1 group-hover:flex">
                    <PencilIcon
                      className="h-4 w-4"
                      onClick={() => {
                        setChannel(textChannel)
                        onOpen('EDIT_CHANNEL')
                      }}
                    />
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
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => onOpen('CREATE_VOICE_CHANNEL')}
            >
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
                    <Link
                      href={`/servers/${serverId}/channels/${voiceChannel.id}`}
                      className="text-sm hover:underline"
                    >
                      {voiceChannel.name}
                    </Link>
                  </div>
                  <div className="hidden items-center gap-1 group-hover:inline-flex">
                    <PencilIcon
                      className="h-4 w-4"
                      onClick={() => {
                        setChannel(voiceChannel)
                        onOpen('EDIT_CHANNEL')
                      }}
                    />
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
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => onOpen('CREATE_VIDEO_CHANNEL')}
            >
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
                    <Link
                      href={`/servers/${serverId}/channels/${videoChannel.id}`}
                      className="text-sm hover:underline"
                    >
                      {videoChannel.name}
                    </Link>
                  </div>
                  <div className="hidden items-center gap-1 group-hover:inline-flex">
                    <PencilIcon
                      className="h-4 w-4"
                      onClick={() => {
                        setChannel(videoChannel)
                        onOpen('EDIT_CHANNEL')
                      }}
                    />
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
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => onOpen('MANAGE_MEMBER')}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>{' '}
          {members.length > 0 ? (
            <>
              {members.map((member) => (
                <Button
                  className="group flex w-full items-center justify-between gap-1 py-2 text-zinc-300"
                  variant="ghost"
                  key={member.id}
                  disabled={conversationCreate.isPending}
                  onClick={async () =>
                    await conversationCreate.mutateAsync({
                      serverId,
                      senderId: memberId,
                      receiverId: member.id,
                    })
                  }
                >
                  <div className="flex items-center gap-1">
                    {memberRoleIconRecord[member.memberRole]}
                    <span className="text-sm">{member.user.name}</span>
                  </div>
                  {conversationCreate.isPending && (
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                  )}
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
