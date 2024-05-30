'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import getMembers from '@/lib/server/members'
import { useModalStore } from '@/stores/modal'
import { User } from '@prisma/client'
import { DialogDescription } from '@radix-ui/react-dialog'
import { EllipsisIcon, Users2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export const ManageMemberModal = () => {
  const { open, modal, server, onClose } = useModalStore()
  const [members, setMembers] = useState<User[] | null>(null)

  useEffect(() => {
    const serverMembers = async (serverId: string) => {
      const members = await getMembers(serverId)
      setMembers(members)
    }
    if (server) serverMembers(server.id)
  }, [server])

  return (
    <>
      {modal === 'MANAGE_MEMBER' && (
        <Dialog open={open} onOpenChange={() => onClose('INVITE_MEMBER')}>
          <DialogContent className="bg-zinc-800">
            <DialogHeader>
              <div className="flex items-center gap-1">
                <Users2Icon className="h-4 w-4 font-semibold" />
                <DialogTitle>Manage Members</DialogTitle>
              </div>
              <DialogDescription className="text-zinc-300">
                Manage the members of your server with ease.
              </DialogDescription>
            </DialogHeader>
            {members && (
              <ScrollArea className="h-60 w-full rounded-sm bg-black/20">
                <div className="p-4">
                  {members.map((member) => (
                    <>
                      <div
                        key={member.id}
                        className="group w-full rounded-md p-2 text-sm hover:bg-zinc-800"
                      >
                        <Member member={member} />
                      </div>
                    </>
                  ))}
                </div>
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

const Member = ({ member }: { member: User }) => {
  return (
    <div className="my-2 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Avatar className="h-7 w-7">
          <AvatarImage src={member.imageUrl} />
          <AvatarFallback>{member.name[0]}</AvatarFallback>
        </Avatar>
        <span>{member.name}</span>
      </div>
      <EllipsisIcon className="hidden h-4 w-4 group-hover:inline-flex" />
    </div>
  )
}
