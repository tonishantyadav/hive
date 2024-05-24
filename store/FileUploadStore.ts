import { create } from 'zustand'

interface FileUploadStore {
  file: File | null
  fileUrl: string | null
  isUploading: boolean
  isUploadingDone: boolean
  uploadProgress: number
  setFile: (file: File | null) => void
  setFileUrl: (fileUrl: string | null) => void
  setIsUploading: (isUploading: boolean) => void
  setIsUploadingDone: (isUploadingDone: boolean) => void
  setUploadProgress: (
    uploadProgress: number | ((progress: number) => number)
  ) => void
}

export const useFileUploadStore = create<FileUploadStore>((set) => ({
  file: null,
  fileUrl: null,
  isUploading: false,
  isUploadingDone: false,
  uploadProgress: 0,
  setFile: (file) => set({ file }),
  setFileUrl: (fileUrl) => set({ fileUrl }),
  setIsUploading: (isUploading) => set({ isUploading }),
  setIsUploadingDone: (isUploadingDone) => set({ isUploadingDone }),
  setUploadProgress: (uploadProgress) =>
    set((state) => ({
      uploadProgress:
        typeof uploadProgress === 'function'
          ? uploadProgress(state.uploadProgress)
          : uploadProgress,
    })),
}))
