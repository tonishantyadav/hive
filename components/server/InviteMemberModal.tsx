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

  const isOpen = open && modal === 'INVITE_MEMBER'

  const onOpenChange = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1.5">
            <UserPlus2Icon className="h-4 w-4" />
            <span>Invite Member</span>
          </DialogTitle>
          <DialogDescription>
            Invite your friends to your server by sharing the link below.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-3">
          <Input className="w-[26rem]" />
          {copied ? (
            <Check className="h-4 w-4 cursor-pointer" />
          ) : (
            <CopyIcon
              className="h-4 w-4 cursor-pointer"
              onClick={() => setCopied(true)}
            />
          )}
        </div>
        <DialogFooter className="!justify-start">
          <Button className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700">
            <RefreshCcw className="h-4 w-4" />
            <span>Generate new link</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
