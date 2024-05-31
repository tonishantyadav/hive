'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModalStore } from '@/stores/modal'
import { DialogDescription } from '@radix-ui/react-dialog'
import { Users2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ServerMembers } from '@/components/server'

export const MemberManageModal = () => {
  const { open, modal, server, onClose } = useModalStore()
  const [serverId, setServerId] = useState<string | null>(null)

  useEffect(() => {
    if (server) setServerId(server.id)
  }, [server])

  return (
    <>
      {modal === 'MANAGE_MEMBER' && (
        <Dialog open={open} onOpenChange={() => onClose('INVITE_MEMBER')}>
          <DialogContent className="bg-zinc-800">
            <DialogHeader>
              <div className="flex items-center justify-start gap-1">
                <Users2Icon className="h-4 w-4 font-semibold" />
                <DialogTitle>Manage Members</DialogTitle>
              </div>
              <DialogDescription className="flex  justify-start text-zinc-300">
                Manage the members of your server with ease.
              </DialogDescription>
            </DialogHeader>
            {serverId && <ServerMembers serverId={serverId} />}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
