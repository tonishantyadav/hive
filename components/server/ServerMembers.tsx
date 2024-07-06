'use client'

import { MemberWithUser } from '@/components/channel/ChannelBody'
import { ServerMember } from '@/components/server'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useServerMembers } from '@/hooks/server'
import { handleError } from '@/utils/error'
import { FrownIcon, Loader2Icon, Users2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'

export const ServerMembers = ({ serverId }: { serverId: string }) => {
  const { data, isLoading, isError, error } = useServerMembers(serverId)
  const [members, setMembers] = useState<MemberWithUser[] | null>(null)

  useEffect(() => {
    if (data) {
      const admin = data.filter((member) => member.memberRole === 'ADMIN')
      const members = data.filter((member) => member.memberRole !== 'ADMIN')
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
        <ScrollArea className="h-60 w-full rounded-md bg-black/40">
          <div className="p-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="w-full rounded-md p-2 text-sm hover:bg-zinc-800"
              >
                <ServerMember serverId={serverId} member={member} />
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
