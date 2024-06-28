import { Attachement } from '@/components/message/MessageAttachementModal'
import { FileTextIcon } from 'lucide-react'
import Image from 'next/image'

export const MessageAttachementPreview = ({
  attachement,
}: {
  attachement: Attachement
}) => {
  const isImage = imageExtensions.includes(attachement.type)

  return (
    <>
      {isImage ? (
        <div className="relative mx-3 flex h-12 w-12">
          <Image
            src={attachement.url}
            alt="Server uploaded image"
            fill={true}
            className="rounded-xl"
          />
        </div>
      ) : (
        <FileTextIcon className="mx-3 h-10 w-10 fill-rose-400 stroke-rose-600" />
      )}
    </>
  )
}

const imageExtensions = ['image/png', 'image/jpeg']
