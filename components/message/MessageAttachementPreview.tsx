import { Attachement } from '@/components/message/MessageAttachementModal'
import { FileTextIcon, ImageIcon } from 'lucide-react'

export const MessageAttachementPreview = ({
  attachement,
}: {
  attachement: Attachement
}) => {
  const isImage = imageExtensions.includes(attachement.type)

  return (
    <div className="flex">
      {isImage ? (
        <ImageIcon className="mx-2 h-10 w-10 justify-center fill-rose-400 stroke-rose-600" />
      ) : (
        <FileTextIcon className="mx-2 h-10 w-10 fill-rose-400 stroke-rose-600" />
      )}
    </div>
  )
}

const imageExtensions = ['image/png', 'image/jpeg']
