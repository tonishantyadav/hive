import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import prisma from '@/prisma/client'
import { SignOutButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import {
  LogOutIcon,
  ShieldCheckIcon,
  ShieldPlusIcon,
  UserIcon,
} from 'lucide-react'
import { redirect } from 'next/navigation'

export const ChannelFooter = async () => {
  const { userId: clerkUserId } = auth()
  if (!clerkUserId) redirect('/')

  const member = await prisma.user.findUnique({ where: { clerkUserId } })
  if (!member) redirect('/')

  return (
    <div className="flex items-center justify-between border-t px-2 py-3">
      <div className="flex items-center gap-1">
        <Avatar className="h-8 w-8">
          <AvatarImage src={member.imageUrl} alt={`@${member.name}`} />
          <AvatarFallback>{member.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            {memberRoleIconMap[member.userRole]}
            <span className="text-sm font-semibold">{member.name}</span>
          </div>
          <span className="ml-1 text-xs text-zinc-300/80">{member.email}</span>
        </div>
      </div>
      <SignOutButton>
        <Button
          className="rounded-full hover:bg-rose-600"
          variant="ghost"
          size="icon"
        >
          <LogOutIcon className="h-4 w-4" />
        </Button>
      </SignOutButton>
    </div>
  )
}

export const memberRoleIconMap = {
  ADMIN: <ShieldPlusIcon className="h-4 w-4 text-emerald-600" />,
  MODERATOR: <ShieldCheckIcon className="h-4 w-4 text-indigo-500" />,
  MEMBER: <UserIcon className="h-4 w-4 text-zinc-200/80" />,
}
