'use client'

import { Channel, Server, User } from '@prisma/client'
import { create } from 'zustand'

export type Modal =
  | 'CREATE_SERVER'
  | 'DELETE_SERVER'
  | 'LEAVE_SERVER'
  | 'CREATE_CHANNEL'
  | 'INVITE_MEMBER'
  | 'MANAGE_MEMBER'
  | 'SHEET'

interface ModalStore {
  modal: Modal | null
  open: boolean
  server?: Server | null
  channel?: Channel | null
  user?: User | null
  onOpen: (modal: Modal) => void
  onClose: (modal: Modal) => void
  setServer: (server: Server) => void
  setChannel: (channel: Channel) => void
  setUser: (user: User) => void
}

export const useModalStore = create<ModalStore>((set) => ({
  modal: null,
  open: false,
  server: null,
  channel: null,
  user: null,
  onOpen: (modal) => set({ open: true, modal }),
  onClose: (modal) => set({ open: false, modal }),
  setServer: (server) => set({ server }),
  setChannel: (channel) => set({ channel }),
  setUser: (user) => set({ user }),
}))
