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
import { useMemberRoleUpdate } from '@/hooks/member'
import { cn } from '@/lib/utils'
import { handleError } from '@/utils/error'
import { User, UserRole } from '@prisma/client'
import {
  EllipsisIcon,
  Gavel,
  Shield,
  ShieldCheck,
  ShieldCheckIcon,
  ShieldPlusIcon,
  ShieldQuestion,
} from 'lucide-react'

export const ServerMember = ({
  serverId,
  member,
}: {
  serverId: string
  member: User
}) => {
  const memberRoleUpdate = useMemberRoleUpdate()

  const onChangeMemberRole = async (memberRole: UserRole) => {
    try {
      await memberRoleUpdate.mutateAsync({
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

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Avatar className="h-7 w-7">
          <AvatarImage src={member.imageUrl} />
          <AvatarFallback>{member.name[0]}</AvatarFallback>
        </Avatar>
        <span>{member.name}</span>
        {memberRoleIcon[member.userRole]}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisIcon
            className={cn(
              'h-4 w-4',
              member.userRole !== 'ADMIN' ? 'inline-flex' : 'hidden'
            )}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" border-zinc-800 bg-zinc-900 p-2">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-1">
              <ShieldQuestion className="h-4 w-4" />
              <span>Role</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="ml-3 mt-3 border-zinc-800 bg-zinc-900">
                <DropdownMenuItem
                  className="flex items-center gap-1 hover:!bg-zinc-700"
                  onClick={async () => await onChangeMemberRole('MEMBER')}
                >
                  <Shield className="h-4 w-4" />
                  <span>Member</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-1 hover:!bg-zinc-700"
                  onClick={async () => await onChangeMemberRole('MODERATOR')}
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Moderator</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem className="mt-1 flex cursor-pointer items-center gap-1 hover:!bg-zinc-700">
            <Gavel className="h-4 w-4" />
            <span>Kick</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const memberRoleIcon = {
  ADMIN: <ShieldPlusIcon className="ml-2 h-4 w-4 text-emerald-600" />,
  MODERATOR: <ShieldCheckIcon className="ml-2 h-4 w-4 text-indigo-500" />,
  MEMBER: null,
}
