'use client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useChannelDelete } from '@/hooks/channel'
import { useModalStore } from '@/stores/modal'
import { handleError } from '@/utils/error'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const ChannelDeleteModal = () => {
  const router = useRouter()
  const channelDelete = useChannelDelete()
  const { modal, open, server, channel, onClose } = useModalStore()

  const onDelete = async () => {
    try {
      if (server && channel) {
        await channelDelete.mutateAsync({
          serverId: server.id,
          channelId: channel.id,
        })
        onClose('DELETE_CHANNEL')
        router.refresh()
      }
    } catch (error) {
      const errorMessage = handleError(error)
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: errorMessage,
      })
      onClose('DELETE_CHANNEL')
    }
  }

  return (
    <>
      {modal === 'DELETE_CHANNEL' && server && channel && (
        <AlertDialog open={open} onOpenChange={() => onClose('DELETE_CHANNEL')}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove your{' '}
                <span className="font-medium text-zinc-300">
                  {channel.name}
                </span>{' '}
                channel from{' '}
                <span className="font-medium text-zinc-300">{server.name}</span>{' '}
                server.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  onClose('DELETE_CHANNEL')
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-rose-600 text-white hover:bg-rose-700"
                onClick={onDelete}
              >
                {channelDelete.isPending ? (
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                ) : (
                  'Continue'
                )}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
