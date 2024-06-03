'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { CommandIcon, Search } from 'lucide-react'
import { useState } from 'react'

export const ChannelSearchBar = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        className="text-zinc-300/80hover:text-white flex items-center justify-between gap-1 rounded-sm border p-2"
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
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
