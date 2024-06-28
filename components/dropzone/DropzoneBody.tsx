import { Button } from '@/components/ui/button'
import { LoaderCircle, UploadCloudIcon } from 'lucide-react'
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone'

export const DropzoneBody = ({
  isUploading,
  open,
  getRootProps,
  getInputProps,
}: {
  isUploading: boolean
  open: () => void
  getRootProps: () => DropzoneRootProps
  getInputProps: () => DropzoneInputProps
}) => {
  return (
    <div
      {...getRootProps()}
      className="flex h-full flex-col items-center justify-center"
    >
      <input {...getInputProps()} />
      <UploadCloudIcon className="h-[4rem] w-[4rem] text-zinc-700" />
      <span className="text-lg font-medium">Drop your file</span>
      <span>or</span>
      {isUploading ? (
        <Button
          className="my-2 flex items-center gap-1 bg-indigo-500 font-medium text-white"
          disabled={isUploading}
        >
          <LoaderCircle className="h-4 w-4 animate-spin" />
          <span>Uploading</span>
        </Button>
      ) : (
        <Button
          className="my-2 rounded-full bg-indigo-500 font-medium text-white hover:bg-indigo-600"
          onClick={open}
        >
          Browse
        </Button>
      )}
    </div>
  )
}
