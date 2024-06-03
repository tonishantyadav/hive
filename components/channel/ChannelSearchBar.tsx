'use client'

import {
  TextChannel,
  VideoChannel,
  VoiceChannel,
} from '@/components/channel/ChannelBody'
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
  Mic2Icon,
  Search,
  TextIcon,
  VideoIcon,
} from 'lucide-react'
import { useState } from 'react'

interface ChannelSearchBarProps {
  textChannels: TextChannel[]
  voiceChannels: VoiceChannel[]
  videoChannels: VideoChannel[]
}

export const ChannelSearchBar = ({
  textChannels,
  voiceChannels,
  videoChannels,
}: ChannelSearchBarProps) => {
  const [open, setOpen] = useState(false)

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
        <CommandInput placeholder="Search channels..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {textChannels.length > 0 && (
            <CommandGroup heading="Text">
              {textChannels.map((textChannel) => (
                <CommandItem className="gap-1" key={textChannel.id}>
                  <TextIcon className="h-4 w-4" />
                  <span>{textChannel.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          <CommandSeparator />
          {voiceChannels.length > 0 && (
            <CommandGroup heading="Voice">
              {voiceChannels.map((voiceChannel) => (
                <CommandItem className="gap-1" key={voiceChannel.id}>
                  <Mic2Icon className="h-4 w-4" />
                  <span>{voiceChannel.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          <CommandSeparator />
          {videoChannels.length > 0 && (
            <CommandGroup heading="Video">
              {videoChannels.map((videoChannel) => (
                <CommandItem className="gap-1" key={videoChannel.id}>
                  <VideoIcon className="h-4 w-4" />
                  <span>{videoChannel.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
