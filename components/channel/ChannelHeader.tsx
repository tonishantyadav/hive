import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserRole } from '@prisma/client'
import {
  ChevronDownIcon,
  PlusCircleIcon,
  SettingsIcon,
  Trash2Icon,
  UserPlus2Icon,
  Users2Icon,
} from 'lucide-react'

interface ChannelHeaderProps {
  serverName: string
  userRole: UserRole
}

export const ChannelHeader = async ({
  serverName,
  userRole,
}: ChannelHeaderProps) => {
  const isAdmin = userRole === UserRole.ADMIN
  const isModerator = userRole === UserRole.MODERATOR
  const isMember = userRole === UserRole.MEMBER

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex h-12 w-full items-center justify-between rounded-none border-b-2 border-zinc-700 text-sm font-semibold hover:bg-zinc-700/60 focus-visible:ring-0 focus-visible:ring-offset-0"
            variant="ghost"
          >
            <span className="capitalize">{serverName}</span>
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="hidden w-64 flex-col border-none bg-zinc-900 py-2 md:inline-flex lg:inline-flex">
          {(isAdmin || isModerator || isMember) && (
            <DropdownMenuItem className="group flex cursor-pointer  justify-between hover:!bg-indigo-600">
              <span>Invite People</span>
              <UserPlus2Icon className="h-4 w-4 text-indigo-400 group-hover:text-white" />
            </DropdownMenuItem>
          )}
          {(isAdmin || isModerator) && (
            <DropdownMenuItem className="flex cursor-pointer justify-between hover:!bg-indigo-600">
              <span>Create Channel</span>
              <PlusCircleIcon className="h-4 w-4" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem className="flex cursor-pointer justify-between hover:!bg-indigo-600">
              <span>Server Settings</span>
              <SettingsIcon className="h-4 w-4" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem className="flex cursor-pointer justify-between hover:!bg-indigo-600">
              <span>Manage Members</span>
              <Users2Icon className="h-4 w-4" />
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator className="bg-zinc-800" />
          {isAdmin && (
            <DropdownMenuItem className="group flex cursor-pointer  justify-between hover:!bg-rose-600">
              <span>Delete Server</span>
              <Trash2Icon className="h-4 w-4 text-rose-500 group-hover:text-white" />
            </DropdownMenuItem>
          )}
          {(isModerator || isMember) && (
            <DropdownMenuItem className="group flex cursor-pointer  justify-between hover:!bg-rose-600">
              <span>Delete Server</span>
              <Trash2Icon className="h-4 w-4 text-rose-500 group-hover:text-white" />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
