import { SignoutButton } from '@/components/SignoutButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MemberRole, User } from '@prisma/client'
import { ShieldCheckIcon, ShieldPlusIcon, UserIcon } from 'lucide-react'
import { ReactNode } from 'react'

export const ChannelFooter = async ({
  user,
  memberRole,
}: {
  user: User
  memberRole: MemberRole
}) => {
  return (
    <div className="flex items-center justify-between border-t px-2 py-3">
      <div className="flex items-center gap-1">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.image!} alt={`@${user.name}`} />
          <AvatarFallback>{user.name![0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            {memberRoleIconMap[memberRole]}
            <span className="text-sm font-semibold">{user.name}</span>
          </div>
          <span className="ml-1 text-xs text-zinc-300/80">{user.email}</span>
        </div>
      </div>
      <SignoutButton />
    </div>
  )
}

export const memberRoleIconMap: Record<MemberRole, ReactNode> = {
  [MemberRole.ADMIN]: <ShieldPlusIcon className="h-4 w-4 text-emerald-600" />,
  [MemberRole.MODERATOR]: (
    <ShieldCheckIcon className="h-4 w-4 text-indigo-500" />
  ),
  [MemberRole.MEMBER]: <UserIcon className="h-4 w-4 text-zinc-200/80" />,
}
