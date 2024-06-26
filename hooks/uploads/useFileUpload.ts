import { toast } from '@/components/ui/use-toast'
import { useUploadThing } from '@/lib/uploadthing'
import { useModalStore } from '@/stores/modal'
import { checkFileSize } from '@/utils/file-size'
import { useCallback, useState } from 'react'
import { UploadThingError } from 'uploadthing/server'

export const useFileUpload = (attachement: boolean = false) => {
  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isUploadingDone, setIsUploadingDone] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const setAttachement = useModalStore((state) => state.setAttachement)

  const { startUpload } = useUploadThing('fileUploader', {
    onClientUploadComplete: async (res) => {
      setIsUploading(false)
      setIsUploadingDone(true)
      setFileUrl(res[0].url)
      if (attachement) {
        setAttachement({
          name: res[0].name,
          url: res[0].url,
          type: res[0].type,
        })
      }
    },
    onUploadError: () => {
      toast({
        variant: 'destructive',
        title: 'Uh-Oh! Something went wrong',
        description: 'Unable to upload your file.',
      })
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
      console.log(acceptedFiles)
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
