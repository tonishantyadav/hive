'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useModalStore } from '@/stores/modal'
import { Server, UserRole } from '@prisma/client'
import {
  BotIcon,
  ChevronDownIcon,
  LogOutIcon,
  PlusCircleIcon,
  SettingsIcon,
  Trash2Icon,
  UserPlus2Icon,
  Users2Icon,
} from 'lucide-react'
import { useEffect } from 'react'

export const ChannelHeader = ({
  server,
  userRole,
}: {
  server: Server
  userRole: string
}) => {
  const { onOpen, setServer } = useModalStore()

  const isAdmin = userRole === UserRole.ADMIN
  const isModerator = userRole === UserRole.MODERATOR
  const isMember = userRole === UserRole.MEMBER

  useEffect(() => {
    if (server) setServer(server)
    // eslint-disable-next-line
  }, [])

  if (server.isDefault) return null

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex h-12 w-full items-center justify-between rounded-none border-b text-sm font-semibold focus-visible:ring-0 focus-visible:ring-offset-0"
            variant="ghost"
          >
            <div className="flex items-center gap-1">
              <BotIcon className="h-4 w-4" />
              <span className="capitalize">{server.name}</span>
            </div>
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex w-[16rem] flex-col md:w-[18.2rem] lg:w-[18.2rem]">
          {(isAdmin || isModerator || isMember) && (
            <DropdownMenuItem
              className="group flex cursor-pointer justify-between "
              onClick={() => {
                onOpen('INVITE_MEMBER')
              }}
            >
              <span>Invite People</span>
              <UserPlus2Icon className="h-4 w-4 text-indigo-500 group-hover:text-white" />
            </DropdownMenuItem>
          )}
          {(isAdmin || isModerator) && (
            <DropdownMenuItem
              className="flex cursor-pointer justify-between"
              onClick={() => onOpen('CREATE_CHANNEL')}
            >
              <span>Create Channel</span>
              <PlusCircleIcon className="h-4 w-4" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              className="flex cursor-pointer justify-between"
              onClick={() => onOpen('MANAGE_MEMBER')}
            >
              <span>Manage Members</span>
              <Users2Icon className="h-4 w-4" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem className="flex cursor-pointer justify-between">
              <span>Server Settings</span>
              <SettingsIcon className="h-4 w-4" />
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator className="bg-zinc-800" />
          {isAdmin && (
            <DropdownMenuItem
              className="group flex cursor-pointer  justify-between hover:!bg-rose-600"
              onClick={() => onOpen('DELETE_SERVER')}
            >
              <span>Delete Server</span>
              <Trash2Icon className="h-4 w-4 text-rose-600 group-hover:text-white" />
            </DropdownMenuItem>
          )}
          {(isModerator || isMember) && (
            <DropdownMenuItem
              className="group flex cursor-pointer  justify-between hover:!bg-rose-600"
              onClick={() => onOpen('LEAVE_SERVER')}
            >
              <span>Leave Server</span>
              <LogOutIcon className="h-4 w-4 text-rose-600 group-hover:text-white" />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
