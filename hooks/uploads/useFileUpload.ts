import { useUploadThing } from '@/lib/uploadthing'
import { checkFileSize } from '@/utils/file-size'
import { useCallback, useState } from 'react'
import { UploadThingError } from 'uploadthing/server'

export const useFileUpload = () => {
  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isUploadingDone, setIsUploadingDone] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const { startUpload } = useUploadThing('imageUploader', {
    onClientUploadComplete: async (res) => {
      setIsUploading(false)
      setIsUploadingDone(true)
      setFileUrl(res[0].url)
    },
    onUploadError: () => {
      // Show toast message
    },
  })

  const onUploadProgress = () => {
    const interval = setInterval(() => {
      setUploadProgress((progress: number) => {
        if (progress >= 90) {
          clearInterval(interval)
          return progress
        }
        return progress + 5
      })
    }, 500)
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setIsUploading(true)
      setFile(acceptedFiles[0])
      onUploadProgress()

      if (acceptedFiles[0] && checkFileSize(acceptedFiles[0].size))
        throw new UploadThingError('File size exceed.')

      await startUpload(acceptedFiles)
      setUploadProgress(100)
    } catch (error: any) {
      setFile(null)
      // Show toast message
    }
    // eslint-disable-next-line
  }, [])

  return {
    file,
    fileUrl,
    isUploading,
    isUploadingDone,
    uploadProgress,
    setFileUrl,
    onDrop,
  }
}
