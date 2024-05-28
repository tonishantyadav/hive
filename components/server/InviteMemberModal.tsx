'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useModalStore } from '@/stores/modal'
import { Check, CopyIcon, RefreshCcw, UserPlus2Icon } from 'lucide-react'
import { useState } from 'react'

export const InviteMemberModal = () => {
  const { modal, open, onClose, server } = useModalStore()
  const [copied, setCopied] = useState(false)

  const invitationLink = server
    ? `${process.env.NEXT_PUBLIC_APP_URL}/invite/${server.id}`
    : 'Please generate a new invitation link!'

  return (
    <>
      {open && modal === 'INVITE_MEMBER' && (
        <Dialog open={open} onOpenChange={() => onClose('INVITE_MEMBER')}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex w-full items-center gap-1.5">
                <UserPlus2Icon className="h-4 w-4" />
                <span>Invite Member</span>
              </DialogTitle>
              <DialogDescription className="w-full">
                Invite your friends to your server by sharing the link below.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <Input
                className="text-zinc-300"
                value={invitationLink}
                readOnly
              />
              <Button
                className=" hover:bg-zinc-700"
                variant="ghost"
                size="icon"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <CopyIcon
                    className="h-4 w-4"
                    onClick={() => setCopied(true)}
                  />
                )}
              </Button>
            </div>
            <DialogFooter className="!justify-start">
              <Button className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700">
                <RefreshCcw className="h-4 w-4" />
                <span>Generate new link</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
