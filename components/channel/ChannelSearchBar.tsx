'use client'

import {
  MemberWithUser,
  TextChannel,
  VideoChannel,
  VoiceChannel,
} from '@/components/channel/ChannelBody'
import { memberRoleIconRecord } from '@/components/channel/ChannelFooter'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  CommandIcon,
  HashIcon,
  MicIcon,
  Search,
  UserIcon,
  VideoIcon,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ChannelSearchBarProps {
  members: MemberWithUser[]
  textChannels: TextChannel[]
  voiceChannels: VoiceChannel[]
  videoChannels: VideoChannel[]
}

export const ChannelSearchBar = ({
  members,
  textChannels,
  voiceChannels,
  videoChannels,
}: ChannelSearchBarProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault()
        setOpen(!open)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <>
      <Button
        className="flex items-center justify-between gap-1 rounded-sm border p-2 text-zinc-300/80 hover:text-white"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-1">
          <Search className="h-4 w-4" />
          <span className="text-sm font-medium ">Search</span>
        </div>
        <kbd className="flex items-center gap-1 rounded-sm bg-zinc-800 p-1 text-xs">
          <CommandIcon className="h-4 w-4" />
          <span>K</span>
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search channels and members" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {textChannels.length > 0 && (
            <CommandGroup heading="Text">
              {textChannels.map((textChannel) => (
                <CommandItem
                  className="gap-1 text-zinc-300/70"
                  key={textChannel.id}
                  onSelect={() =>
                    router.push(`${pathname}/channels/${textChannel.id}`)
                  }
                >
                  <HashIcon className="h-4 w-4" />
                  <span>{textChannel.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          <CommandSeparator />
          {voiceChannels.length > 0 && (
            <CommandGroup heading="Voice">
              {voiceChannels.map((voiceChannel) => (
                <CommandItem
                  className="gap-1 text-zinc-300/70"
                  key={voiceChannel.id}
                  onSelect={() =>
                    router.push(`${pathname}/channels/${voiceChannel.id}`)
                  }
                >
                  <MicIcon className="h-4 w-4" />
                  <span>{voiceChannel.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          <CommandSeparator />
          {videoChannels.length > 0 && (
            <CommandGroup heading="Video">
              {videoChannels.map((videoChannel) => (
                <CommandItem
                  className="gap-1 text-zinc-300/70"
                  key={videoChannel.id}
                  onSelect={() =>
                    router.push(`${pathname}/channels/${videoChannel.id}`)
                  }
                >
                  <VideoIcon className="h-4 w-4" />
                  <span>{videoChannel.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          <CommandSeparator />
          {members.length > 0 && (
            <CommandGroup heading="Members">
              {members.map((member) => (
                <CommandItem className="gap-1 text-zinc-300/70" key={member.id}>
                  {member.memberRole === 'ADMIN' ||
                  member.memberRole === 'MODERATOR' ? (
                    memberRoleIconRecord[member.memberRole]
                  ) : (
                    <UserIcon className="h-4 w-4" />
                  )}
                  <span>{member.user.username}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
