'use client'

import { Dropzone } from '@/components/dropzone'
import { ServerCreateForm } from '@/components/server'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useFileUpload } from '@/hooks/uploads/useFileUpload'
import { ServerCreateSchema } from '@/schemas/server'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const ServerCreateDialog = () => {
  const form = useForm<z.infer<typeof ServerCreateSchema>>({
    resolver: zodResolver(ServerCreateSchema),
    defaultValues: {
      name: '',
    },
  })
  const { fileUrl, isUploading, onDrop, setFileUrl } = useFileUpload()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      form.reset()
      setFileUrl(null)
      setIsSubmit(false)
    }
    // eslint-disable-next-line
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Create server</Button>
      </DialogTrigger>
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
          {!fileUrl && isSubmit && (
            <p className="text-sm font-semibold text-red-500">
              Image is required
            </p>
          )}
        </div>
        <ServerCreateForm
          fileUrl={fileUrl}
          isUploading={isUploading}
          form={form}
          setIsOpen={setIsOpen}
          setIsSubmit={setIsSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}
