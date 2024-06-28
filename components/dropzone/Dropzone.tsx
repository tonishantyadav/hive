'use client'

import { DropzoneBody } from '@/components/dropzone'
import Image from 'next/image'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { BeatLoader } from 'react-spinners'

interface DropzoneProps {
  fileUrl: string | null
  accept: Accept
  isUploading: boolean
  onDrop: (acceptedFiles: File[]) => Promise<void>
}

export const Dropzone = ({
  fileUrl,
  accept,
  isUploading,
  onDrop,
}: DropzoneProps) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    multiple: false,
    accept: fileAccept[accept],
  })
  const [imageLoad, setImageLoad] = useState(true)

  return (
    <>
      <div className="h-60 rounded-xl border-2 border-dashed">
        {fileUrl && accept === 'image' ? (
          <>
            {imageLoad && (
              <div className="flex h-full items-center justify-center">
                <BeatLoader color="#323439" />
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

type Accept = 'all' | 'image'

const fileAccept: Record<Accept, { [key: string]: string[] }> = {
  image: { 'image/*': ['.jpeg', '.png'] },
  all: { 'image/*': ['.jpeg', '.png'], 'application/pdf': ['.pdf'] },
}
