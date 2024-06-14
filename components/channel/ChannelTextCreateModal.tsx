'use client'

import { ChannelTextCreateForm } from '@/components/channel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModalStore } from '@/stores/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { HashIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const TextChannelCreateSchema = z.object({
  channelName: z
    .string()
    .min(1, 'Channel name is required')
    .max(255, 'Channel name is too long')
    .refine((name) => name !== 'general', "Channel name cannot be 'general'"),
})

export const ChannelTextCreateModal = () => {
  const form = useForm<z.infer<typeof TextChannelCreateSchema>>({
    resolver: zodResolver(TextChannelCreateSchema),
    defaultValues: {
      channelName: '',
    },
  })
  const { modal, open, server, onClose } = useModalStore()

  return (
    <>
      {modal === 'CREATE_TEXT_CHANNEL' && (
        <Dialog
          open={open}
          onOpenChange={() => {
            form.reset()
            onClose('CREATE_TEXT_CHANNEL')
          }}
        >
          <DialogContent>
            <DialogHeader>
              <div className="flex items-center justify-between gap-1 md:justify-start lg:justify-start">
                <HashIcon className="h-4 w-4 font-semibold" />
                <DialogTitle className="text-xl">
                  Create text Channel
                </DialogTitle>
              </div>
              <DialogDescription className="flex justify-start text-sm text-zinc-300">
                Create a channel and connect with your friends seamlessly.{' '}
              </DialogDescription>
            </DialogHeader>
            {server && (
              <ChannelTextCreateForm form={form} serverId={server.id} />
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
