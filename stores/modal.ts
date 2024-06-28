'use client'

import { Attachement } from '@/components/chat/MessageAttachement'
import { Channel, Server, User } from '@prisma/client'
import { create } from 'zustand'

export type Modal =
  | 'CREATE_SERVER'
  | 'DELETE_SERVER'
  | 'LEAVE_SERVER'
  | 'CREATE_CHANNEL'
  | 'DELETE_CHANNEL'
  | 'UPDATE_CHANNEL'
  | 'CREATE_TEXT_CHANNEL'
  | 'CREATE_VOICE_CHANNEL'
  | 'CREATE_VIDEO_CHANNEL'
  | 'INVITE_MEMBER'
  | 'MANAGE_MEMBER'
  | 'SHEET'
  | 'MESSAGE_ATTACHEMENT'

interface ModalStore {
  modal: Modal | null
  open: boolean
  server?: Server | null
  channel?: Channel | null
  user?: User | null
  attachement?: Attachement | null
  onOpen: (modal: Modal) => void
  onClose: (modal: Modal) => void
  setServer: (server: Server) => void
  setChannel: (channel: Channel) => void
  setUser: (user: User) => void
  setAttachement: (attachement: Attachement) => void
}

export const useModalStore = create<ModalStore>((set) => ({
  modal: null,
  open: false,
  server: null,
  channel: null,
  user: null,
  file: null,
  onOpen: (modal) => set({ open: true, modal }),
  onClose: (modal) => set({ open: false, modal }),
  setServer: (server) => set({ server }),
  setChannel: (channel) => set({ channel }),
  setUser: (user) => set({ user }),
  setAttachement: (attachement) => set({ attachement }),
}))
