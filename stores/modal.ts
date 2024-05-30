import { Channel, Server } from '@prisma/client'
import { create } from 'zustand'

export type Modal = 'CREATE_SERVER' | 'INVITE_MEMBER' | 'MANAGE_MEMBER'

interface ModalStore {
  modal: Modal | null
  open: boolean
  server?: Server | null
  channel?: Channel | null
  onOpen: (modal: Modal) => void
  onClose: (modal: Modal) => void
  setServer: (server: Server) => void
  setChannel: (channel: Channel) => void
}

export const useModalStore = create<ModalStore>((set) => ({
  modal: null,
  open: false,
  server: null,
  onOpen: (modal) => set({ open: true, modal }),
  onClose: (modal) => set({ open: false, modal }),
  setServer: (server) => set({ server }),
  setChannel: (channel) => set({ channel }),
}))
