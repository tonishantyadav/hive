import { create } from 'zustand'

export type ModalType = 'CREATE_SERVER'

interface ModalStore {
  type: ModalType | null
  open: boolean
  onOpen: (type: ModalType) => void
  onClose: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  open: false,
  onOpen: (type) => set({ open: true, type }),
  onClose: () => set({ open: false, type: null }),
}))
