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
import { useServerDelete } from '@/hooks/server'
import { useModalStore } from '@/stores/modal'
import { handleError } from '@/utils/error'
import { useRouter } from 'next/navigation'
import { BeatLoader } from 'react-spinners'

export const ChannelDeleteModal = () => {
  const router = useRouter()
  const serverDelete = useServerDelete()
  const { modal, open, server, channel, onClose } = useModalStore()

  const onDelete = async () => {
    console.log(channel)
    try {
      if (channel) {
        await serverDelete.mutateAsync(channel.id)
        onClose('DELETE_CHANNEL')
        router.push('/')
      }
    } catch (error) {
      const errorMessage = handleError(error)
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: errorMessage,
      })
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
                from{' '}
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
                {serverDelete.isPending ? (
                  <BeatLoader size={10} color="white" />
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
