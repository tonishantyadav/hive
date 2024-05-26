import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import { Server } from '@prisma/client'
import { ChevronDownIcon } from 'lucide-react'

export const ChannelHeader = ({ server }: { server: Server }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="text-md flex h-12 w-full items-center justify-between rounded-none border-b-2 border-zinc-700 font-semibold hover:bg-zinc-700/60 focus-visible:ring-0 focus-visible:ring-offset-0"
            variant="ghost"
          >
            <span>{server.name}</span>
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 border-none bg-zinc-900">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer hover:bg-indigo-600">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
