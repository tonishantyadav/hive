'use client'

import { Dropzone } from '@/components/dropzone'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useFileUpload } from '@/hooks/uploads/useFileUpload'
import { useModalStore } from '@/stores/modal'
import { PaperclipIcon } from 'lucide-react'

export interface Attachement {
  name: string
  url: string
  type: string
}

export const MessageAttachementModal = () => {
  const { modal, open, onClose } = useModalStore()
  const { fileUrl, isUploading, onDrop } = useFileUpload(true) // Upload file as an message attachement

  return (
    <>
      {modal === 'MESSAGE_ATTACHEMENT' && (
        <Dialog open={open} onOpenChange={() => onClose('MESSAGE_ATTACHEMENT')}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-1 md:text-2xl lg:text-2xl">
                <PaperclipIcon className="h-4 w-4" />
                <span>Add your attachement</span>
              </DialogTitle>
              <DialogDescription>
                Easily add image or pdf and share it with others.
              </DialogDescription>
            </DialogHeader>
            <Dropzone
              accept="all"
              fileUrl={fileUrl}
              isUploading={isUploading}
              onDrop={onDrop}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
