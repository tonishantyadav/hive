'use client'

import { Dropzone } from '@/components/dropzone'
import { ServerCreateForm } from '@/components/server'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useFileUpload } from '@/hooks/uploads/useFileUpload'
import { ServerCreateSchema } from '@/schemas/server'
import { useModalStore } from '@/stores/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const ServerCreateModal = () => {
  const form = useForm<z.infer<typeof ServerCreateSchema>>({
    resolver: zodResolver(ServerCreateSchema),
    defaultValues: {
      name: '',
    },
  })
  const { type, open, onClose } = useModalStore()
  const { fileUrl, isUploading, onDrop } = useFileUpload()

  const isOpen = open && type === 'CREATE_SERVER'

  console.log({ open, isOpen })

  const onOpenChange = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Create your server</DialogTitle>
          <DialogDescription>
            Create a server and connect with your friends.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Dropzone
            fileUrl={fileUrl}
            isUploading={isUploading}
            onDrop={onDrop}
          />
          {!fileUrl && (
            <p className="text-sm font-semibold text-red-500">
              Image is required
            </p>
          )}
        </div>
        <ServerCreateForm
          fileUrl={fileUrl}
          isUploading={isUploading}
          form={form}
        />
      </DialogContent>
    </Dialog>
  )
}
