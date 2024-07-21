'use client'

import { ChannelEditForm } from '@/components/channel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ChannelEditSchema } from '@/schemas/channel'
import { useModalStore } from '@/stores/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { TvIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const ChannelEditModal = () => {
  const { modal, open, server, channel, onClose } = useModalStore()
  const form = useForm<z.infer<typeof ChannelEditSchema>>({
    resolver: zodResolver(ChannelEditSchema),
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
      {modal === 'EDIT_CHANNEL' && server && channel && (
        <Dialog
          open={open}
          onOpenChange={() => {
            form.reset()
            onClose('EDIT_CHANNEL')
          }}
        >
          <DialogContent>
            <DialogHeader>
              <div className="flex items-center justify-between gap-1 md:justify-start lg:justify-start">
                <TvIcon className="h-4 w-4 font-semibold" />
                <DialogTitle className="text-xl">Edit Your Channel</DialogTitle>
              </div>
              <DialogDescription className="flex justify-start text-sm text-zinc-300">
                Give your channel a new name.{' '}
              </DialogDescription>
            </DialogHeader>
            <ChannelEditForm
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
