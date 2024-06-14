'use client'

import { ChannelVideoCreateForm } from '@/components/channel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModalStore } from '@/stores/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { MicIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const VideoChannelCreateSchema = z.object({
  channelName: z
    .string()
    .min(1, 'Channel name is required')
    .max(255, 'Channel name is too long')
    .refine((name) => name !== 'general', "Channel name cannot be 'general'"),
})

export const ChannelVideoCreateModal = () => {
  const form = useForm<z.infer<typeof VideoChannelCreateSchema>>({
    resolver: zodResolver(VideoChannelCreateSchema),
    defaultValues: {
      channelName: '',
    },
  })
  const { modal, open, server, onClose } = useModalStore()

  return (
    <>
      {modal === 'CREATE_VIDEO_CHANNEL' && (
        <Dialog
          open={open}
          onOpenChange={() => {
            form.reset()
            onClose('CREATE_VIDEO_CHANNEL')
          }}
        >
          <DialogContent>
            <DialogHeader>
              <div className="flex items-center justify-between gap-1 md:justify-start lg:justify-start">
                <MicIcon className="h-4 w-4 font-semibold" />
                <DialogTitle className="text-xl">
                  Create video Channel
                </DialogTitle>
              </div>
              <DialogDescription className="flex justify-start text-sm text-zinc-300">
                Create a channel and connect with your friends seamlessly.{' '}
              </DialogDescription>
            </DialogHeader>
            {server && (
              <ChannelVideoCreateForm form={form} serverId={server.id} />
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
