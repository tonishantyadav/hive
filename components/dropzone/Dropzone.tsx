'use client'

import { DropzoneBody } from '@/components/dropzone'
import { useFileUpload } from '@/hooks/uploads/useFileUpload'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'

export const Dropzone = () => {
  const { fileUrl, isUploading, onDrop } = useFileUpload()
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    multiple: false,
    accept: {
      'image/*': ['.jpeg', '.png'],
    },
  })

  return (
    <>
      <div className="h-60 rounded-xl bg-black/20">
        {fileUrl ? (
          <div className="flex h-full items-center justify-center">
            <div className="relative flex h-24 w-24">
              <Image
                src={fileUrl}
                alt="Server uploaded image"
                fill={true}
                className="rounded-full"
              />
            </div>
          </div>
        ) : (
          <DropzoneBody
            isUploading={isUploading}
            open={open}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
          />
        )}
      </div>
    </>
  )
}
