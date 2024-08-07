'use client'

import { MemberWithUser } from '@/components/channel/ChannelBody'
import { memberRoleIconRecord } from '@/components/channel/ChannelFooter'
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
import { toast } from '@/components/ui/use-toast'
import { useMemberDelete, useMemberUpdate } from '@/hooks/member'
import { cn } from '@/lib/utils'
import { handleError } from '@/utils/error'
import { MemberRole } from '@prisma/client'
import {
  CheckIcon,
  EllipsisIcon,
  HammerIcon,
  Loader2Icon,
  Shield,
  ShieldCheck,
  ShieldQuestion,
} from 'lucide-react'

export const ServerMember = ({
  serverId,
  member,
}: {
  serverId: string
  member: MemberWithUser
}) => {
  const memberUpdate = useMemberUpdate()
  const memberDelete = useMemberDelete()

  const onChangeMemberRole = async (memberRole: MemberRole) => {
    try {
      await memberUpdate.mutateAsync({
        serverId,
        memberId: member.id,
        memberRole,
      })
    } catch (error) {
      const errorMessage = handleError(error)
      toast({
        variant: 'destructive',
        title: 'Uh-oh! Something went wrong.',
        description: errorMessage,
      })
    }
  }

  const onMemberKick = async () => {
    try {
      await memberDelete.mutateAsync({
        serverId,
        memberId: member.id,
      })
    } catch (error) {
      const errorMessage = handleError(error)
      toast({
        variant: 'destructive',
        title: 'Uh-oh! Something went wrong.',
        description: errorMessage,
      })
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <Avatar className="h-8 w-8">
          <AvatarImage src={member.user.image!} />
          <AvatarFallback>{member.user.name![0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            {memberRoleIconRecord[member.memberRole]}
            <span>{member.user.name}</span>
          </div>
          <span className="ml-1 text-xs text-zinc-400">
            {member.user.email}
          </span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisIcon
            className={cn(
              'h-4 w-4',
              member.memberRole !== 'ADMIN' ? 'inline-flex' : 'hidden'
            )}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-1">
              <ShieldQuestion className="h-4 w-4" />
              <span>Role</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="ml-3 mt-3">
                <DropdownMenuItem
                  className="flex items-center justify-between hover:!bg-zinc-700"
                  onClick={async () => await onChangeMemberRole('MEMBER')}
                >
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    <span>Member</span>
                  </div>
                  <div className="ml-4">
                    {member.memberRole === 'MEMBER' &&
                    memberUpdate.isPending ? (
                      <Loader2Icon className="h-4 w-4 animate-spin" />
                    ) : (
                      member.memberRole === 'MEMBER' && (
                        <CheckIcon className="h-4 w-4" />
                      )
                    )}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center justify-between hover:!bg-zinc-700"
                  onClick={async () => await onChangeMemberRole('MODERATOR')}
                >
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Moderator</span>
                  </div>
                  <div className="ml-4">
                    {member.memberRole === 'MODERATOR' &&
                    memberUpdate.isPending ? (
                      <Loader2Icon className="h-4 w-4 animate-spin" />
                    ) : (
                      member.memberRole === 'MODERATOR' && (
                        <CheckIcon className="h-4 w-4" />
                      )
                    )}
                  </div>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            className="mt-1 flex cursor-pointer items-center gap-1 hover:!bg-zinc-700"
            onClick={async () => await onMemberKick()}
          >
            {memberDelete.isPending ? (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            ) : (
              <HammerIcon className="h-4 w-4" />
            )}
            <span>Kick</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
