'use client'

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
import { TvIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const ChannelCreateModal = () => {
  const form = useForm<z.infer<typeof ChannelCreateSchema>>({
    resolver: zodResolver(ChannelCreateSchema),
    defaultValues: {
      channelName: '',
      channelCategory: 'TEXT',
    },
  })
  const { modal, open, server, onClose } = useModalStore()

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
          <DialogContent>
            <DialogHeader>
              <div className="flex items-center justify-between gap-1 md:justify-start lg:justify-start">
                <TvIcon className="h-4 w-4 font-semibold" />
                <DialogTitle className="text-xl">Create Channel</DialogTitle>
              </div>
              <DialogDescription className="flex justify-start text-sm text-zinc-300">
                Create a channel and connect with your friends seamlessly.{' '}
              </DialogDescription>
            </DialogHeader>
            {server && <ChannelCreateForm form={form} serverId={server.id} />}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
