'use client'

import { DropzoneBody } from '@/components/dropzone'
import Image from 'next/image'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { BeatLoader } from 'react-spinners'

interface DropzoneProps {
  accept: Accept
  fileUrl: string | null
  isUploading: boolean
  onDrop: (acceptedFiles: File[]) => Promise<void>
}

export type Accept = 'all' | 'image' | 'pdf'

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

export const fileAccept: Record<Accept, { [key: string]: string[] }> = {
  all: { 'image/*': ['.jpeg', '.png'], 'application/pdf': ['.pdf'] },
  image: { 'image/*': ['.jpeg', '.png'] },
  pdf: { 'application/pdf': ['.pdf'] },
}
