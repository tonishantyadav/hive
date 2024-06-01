import { ChannelCreateForm } from '@/components/channel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ChannelCreateSchema } from '@/schemas/channel'
import { useModalStore } from '@/stores/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const ChannelCreateModal = () => {
  const form = useForm<z.infer<typeof ChannelCreateSchema>>({
    resolver: zodResolver(ChannelCreateSchema),
    defaultValues: {
      name: '',
      category: 'TEXT',
    },
  })
  const { modal, open, onClose } = useModalStore()

  return (
    <>
      {modal === 'CREATE_CHANNEL' && (
        <Dialog
          open={open}
          onOpenChange={() => {
            form.reset()
            onClose('CREATE_CHANNEL')
          }}
        >
          <DialogContent className="bg-zinc-900">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Create your channel
              </DialogTitle>
              <DialogDescription className="text-zinc-300">
                Create a channel and connect with your friends seamlessly.{' '}
              </DialogDescription>
            </DialogHeader>
            <ChannelCreateForm form={form} />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
