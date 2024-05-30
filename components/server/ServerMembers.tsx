import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useServerMembers } from '@/hooks/server'
import { useModalStore } from '@/stores/modal'
import { User } from '@prisma/client'
import { EllipsisIcon, Users2Icon } from 'lucide-react'

export const ServerMembers = ({ serverId }: { serverId: string }) => {
  const {
    data: members,
    isLoading,
    isError,
    error,
  } = useServerMembers(serverId)
  const { onClose } = useModalStore()

  return (
    <>
      {members && members.length > 0 ? (
        <ScrollArea className="h-60 w-full rounded-md bg-black/20">
          <div className="p-4">
            {members.map((member) => (
              <>
                <div
                  key={member.id}
                  className="group w-full divide-y rounded-md p-2 text-sm hover:bg-zinc-800"
                >
                  <Member member={member} />
                </div>
              </>
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
      )}{' '}
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
      </div>
      <EllipsisIcon className="hidden h-4 w-4 cursor-pointer group-hover:inline-flex" />
    </div>
  )
}
