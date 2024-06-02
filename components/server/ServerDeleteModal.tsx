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

export const ServerDeleteModal = () => {
  const router = useRouter()
  const serverDelete = useServerDelete()
  const { modal, open, server, onClose } = useModalStore()

  const onDelete = async () => {
    console.log(server)
    try {
      if (server) {
        await serverDelete.mutateAsync(server.id)
        onClose('DELETE_SERVER')
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
      {modal === 'DELETE_SERVER' && server && (
        <AlertDialog open={open} onOpenChange={() => onClose('LEAVE_SERVER')}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove your{' '}
                <span className="font-medium text-zinc-300">{server.name}</span>{' '}
                server from this site.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  onClose('DELETE_SERVER')
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
