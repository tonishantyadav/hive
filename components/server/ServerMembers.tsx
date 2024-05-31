'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useServerMembers } from '@/hooks/server'
import { cn } from '@/lib/utils'
import { handleError } from '@/utils/error'
import { User } from '@prisma/client'
import {
  EllipsisIcon,
  FrownIcon,
  Gavel,
  Loader2Icon,
  Shield,
  ShieldCheck,
  ShieldCheckIcon,
  ShieldPlusIcon,
  ShieldQuestion,
  Users2Icon,
} from 'lucide-react'
import { useEffect, useState } from 'react'

export const ServerMembers = ({ serverId }: { serverId: string }) => {
  const { data, isLoading, isError, error } = useServerMembers(serverId)
  const [members, setMembers] = useState<User[] | null>(null)

  useEffect(() => {
    if (data) {
      const admin = data.filter((member) => member.userRole === 'ADMIN')
      const members = data.filter((member) => member.userRole !== 'ADMIN')
      setMembers(admin.concat(members))
    }
  }, [data])

  if (isLoading)
    return (
      <div className="flex h-60 w-full items-center justify-center bg-black/20">
        <Loader2Icon className="h-4 w-4 animate-spin" />
      </div>
    )

  if (isError) {
    const errorMessage = handleError(error)
    return (
      <div className="flex h-60 w-full flex-col items-center justify-center bg-black/20">
        <div className="flex items-center gap-1 text-rose-500">
          <FrownIcon className="h-4 w-4" />
          <span className="text-lg font-semibold ">
            Uh-oh! Something went wrong.
          </span>
        </div>
        <span className="text-sm text-zinc-400">{errorMessage}</span>
      </div>
    )
  }

  return (
    <>
      {members && members.length > 0 ? (
        <ScrollArea className="h-60 w-full rounded-md bg-black/20">
          <div className="p-4">
            {members.map((member) => (
              <div
                key={member.id} // Ensure key is added here
                className="group w-full divide-y rounded-md p-2 text-sm hover:bg-zinc-800"
              >
                <Member member={member} />
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="flex h-60 w-full flex-col items-center justify-center rounded-md bg-black/20">
          <Users2Icon className="h-8 w-8 text-zinc-600" />
          <span className="text-md w-72 text-center text-zinc-400 md:w-80 md:text-xl lg:w-80 lg:text-xl">
            Whoops! you dont&apos; any members in your server.
          </span>
        </div>
      )}
    </>
  )
}

const Member = ({ member }: { member: User }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Avatar className="h-7 w-7">
          <AvatarImage src={member.imageUrl} />
          <AvatarFallback>{member.name[0]}</AvatarFallback>
        </Avatar>
        <span>{member.name}</span>
        {userRoleIcon[member.userRole]}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisIcon
            className={cn(
              'h-4 w-4 cursor-pointer',
              member.userRole !== 'ADMIN' ? 'inline-flex' : 'hidden'
            )}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" border-zinc-800 bg-zinc-900 p-2">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex cursor-pointer items-center gap-1">
              <ShieldQuestion className="h-4 w-4" />
              <span>Role</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="ml-3 mt-3 border-zinc-800 bg-zinc-900">
                <DropdownMenuItem className="flex cursor-pointer items-center gap-1 hover:!bg-zinc-700">
                  <Shield className="h-4 w-4" />
                  <span>Member</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex cursor-pointer items-center gap-1 hover:!bg-zinc-700">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Moderator</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem className="flex cursor-pointer items-center gap-1 hover:!bg-zinc-700">
            <Gavel className="h-4 w-4" />
            <span>Kick</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const userRoleIcon = {
  ADMIN: <ShieldPlusIcon className="ml-2 h-4 w-4 text-emerald-600" />,
  MODERATOR: <ShieldCheckIcon className="ml-2 h-4 w-4 text-indigo-500" />,
  MEMBER: null,
}
