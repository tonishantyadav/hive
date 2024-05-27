import { Server } from '@prisma/client'
import { create } from 'zustand'

export type Modal = 'CREATE_SERVER' | 'INVITE_MEMBER'

interface ModalStore {
  modal: Modal | null
  open: boolean
  server?: Server | null
  onOpen: (type: Modal) => void
  onClose: () => void
  setServer: (server: Server) => void
}

export const useModalStore = create<ModalStore>((set) => ({
  modal: null,
  open: false,
  server: null,
  onOpen: (modal) => set({ open: true, modal }),
  onClose: () => set({ open: false, modal: null }),
  setServer: (server) => set({ server }),
}))
