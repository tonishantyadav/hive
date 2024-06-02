import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useModalStore } from '@/stores/modal'

export const ServerLeaveModal = () => {
  const { modal, open, server, onClose } = useModalStore()

  return (
    <>
      {modal === 'LEAVE_SERVER' && server && (
        <AlertDialog open={open} onOpenChange={() => onClose('LEAVE_SERVER')}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                <p>
                  This action cannot be undone. This will permanently remove
                  your data from{' '}
                  <span className="font-semibold text-zinc-300">
                    {server.name}
                  </span>
                  server.
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-rose-600 text-white hover:bg-rose-700">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
