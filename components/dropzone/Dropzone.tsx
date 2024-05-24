'use client'

import { DropzoneBody } from '@/components/dropzone'
import Image from 'next/image'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { BounceLoader } from 'react-spinners'

interface DropzoneProps {
  fileUrl: string | null
  isUploading: boolean
  onDrop: (acceptedFiles: File[]) => Promise<void>
}

export const Dropzone = ({ fileUrl, isUploading, onDrop }: DropzoneProps) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    multiple: false,
    accept: {
      'image/*': ['.jpeg', '.png'],
    },
  })
  const [imageLoad, setImageLoad] = useState(true)

  return (
    <>
      <div className="h-60 rounded-xl bg-black/20">
        {fileUrl ? (
          <>
            {imageLoad && (
              <div className="flex h-full items-center justify-center">
                <BounceLoader color="#323439" />
              </div>
            )}{' '}
            <div className="flex h-full items-center justify-center">
              <div className="relative flex h-24 w-24">
                <Image
                  src={fileUrl}
                  alt="Server uploaded image"
                  fill={true}
                  className="rounded-full"
                  onLoad={() => setImageLoad(false)}
                />
              </div>
            </div>
          </>
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
