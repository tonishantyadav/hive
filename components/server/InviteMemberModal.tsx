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
import { toast } from '@/components/ui/use-toast'
import { useGenerateInviteLink } from '@/hooks/server'
import { useModalStore } from '@/stores/modal'
import { handleError } from '@/utils/error'
import { Check, CopyIcon, RefreshCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'

export const InviteMemberModal = () => {
  const generateInviteLink = useGenerateInviteLink()
  const { modal, open, onClose, server } = useModalStore()
  const [copied, setCopied] = useState(false)
  const [link, setLink] = useState<string | null>(null)

  const onLinkCopied = () => {
    if (link) {
      navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 1000)
    }
  }

  const onGenerateNewLink = async () => {
    try {
      if (server) {
        const response = await generateInviteLink.mutateAsync(server.id)
        setLink(inviteLinkPrefix + response.data.inviteCode)
      }
    } catch (error) {
      const errorMessage = handleError(error)
      toast({
        variant: 'destructive',
        title: 'Uh-oh! Something went wrong.',
        description: errorMessage,
      })
      setTimeout(() => onClose('INVITE_MEMBER'), 1000)
    }
  }

  useEffect(() => {
    if (server) setLink(inviteLinkPrefix + server.inviteCode)
  }, [server])

  return (
    <>
      {modal === 'INVITE_MEMBER' && (
        <Dialog open={open} onOpenChange={() => onClose('INVITE_MEMBER')}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Member</DialogTitle>
              <DialogDescription>
                Invite your friends to your server by sharing the link below.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <Input
                className="overflow-auto text-zinc-300 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:pointer-events-none"
                value={link ? link : 'Please generate a new link!'}
                readOnly
              />
              <Button
                className=" hover:bg-zinc-700"
                variant="ghost"
                size="icon"
                onClick={onLinkCopied}
                disabled={!link || generateInviteLink.isPending}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
            <DialogFooter className="!justify-start">
              <Button
                className="flex w-full items-center gap-1 bg-indigo-600 hover:bg-indigo-700"
                onClick={onGenerateNewLink}
              >
                {generateInviteLink.isPending ? (
                  <>
                    <BeatLoader color="white" size={10} />
                  </>
                ) : (
                  <>
                    {' '}
                    <RefreshCcw className="h-4 w-4" />
                    <span>Generate new link</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

const inviteLinkPrefix = `${process.env.NEXT_PUBLIC_APP_URL}/invite/`
