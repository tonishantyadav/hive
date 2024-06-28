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
import { useEffect } from 'react'

export const MessageAttachement = () => {
  const { modal, open, onClose } = useModalStore()
  const { fileUrl, isUploading, onDrop } = useFileUpload()

  useEffect(() => {
    if (fileUrl) onClose('MESSAGE_ATTACHEMENT')
    // eslint-disable-next-line
  }, [fileUrl])

  console.log(fileUrl)

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
                Share your image and pdf with others.
              </DialogDescription>
            </DialogHeader>
            <Dropzone
              fileUrl={fileUrl}
              accept="all"
              isUploading={isUploading}
              onDrop={onDrop}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
