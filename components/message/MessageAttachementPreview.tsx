'use client'

import { Attachement } from '@/components/message/MessageAttachementModal'
import { useModalStore } from '@/stores/modal'
import { FileTextIcon, ImageIcon, XIcon } from 'lucide-react'

export const MessageAttachementPreview = ({
  attachement,
}: {
  attachement: Attachement
}) => {
  const isImage = imageExtensions.includes(attachement.type)
  const { setAttachement } = useModalStore()

  return (
    <div className="flex">
      <div className="group">
        {' '}
        {isImage ? (
          <ImageIcon className="ml-2 h-14 w-14 justify-center fill-rose-400 stroke-rose-600" />
        ) : (
          <FileTextIcon className="ml-2 h-14 w-14 fill-rose-400 stroke-rose-600" />
        )}
      </div>
      <XIcon
        className="relative right-1 mt-1 h-4 w-4 hover:stroke-zinc-300"
        onClick={() => setAttachement(null)}
      />
    </div>
  )
}

const imageExtensions = ['image/png', 'image/jpeg']
