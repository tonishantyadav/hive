'use client'

import { ChannelUpdateForm } from '@/components/channel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModalStore } from '@/stores/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { TvIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const ChannelUpdateSchema = z.object({
  channelName: z
    .string()
    .min(1, 'Channel name is required')
    .max(255, 'Channel name is too long')
    .refine((name) => name !== 'general', "Channel name cannot be 'general'"),
})

export const ChannelUpdateModal = () => {
  const { modal, open, server, channel, onClose } = useModalStore()
  const form = useForm<z.infer<typeof ChannelUpdateSchema>>({
    resolver: zodResolver(ChannelUpdateSchema),
    defaultValues: {
      channelName: '',
    },
  })

  useEffect(() => {
    if (channel) {
      form.reset({
        channelName: channel.name,
      })
    }
  }, [channel, form])

  return (
    <>
      {modal === 'UPDATE_CHANNEL' && server && channel && (
        <Dialog
          open={open}
          onOpenChange={() => {
            form.reset()
            onClose('UPDATE_CHANNEL')
          }}
        >
          <DialogContent>
            <DialogHeader>
              <div className="flex items-center justify-between gap-1 md:justify-start lg:justify-start">
                <TvIcon className="h-4 w-4 font-semibold" />
                <DialogTitle className="text-xl">
                  Update Your Channel
                </DialogTitle>
              </div>
              <DialogDescription className="flex justify-start text-sm text-zinc-300">
                Give your channel a new identity.{' '}
              </DialogDescription>
            </DialogHeader>
            <ChannelUpdateForm
              form={form}
              serverId={server.id}
              channelId={channel.id}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
