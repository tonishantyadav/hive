'use client'

import { InviteMemberModal, ServerCreateModal } from '@/components/server'
import { useModalStore } from '@/stores/modal'

export const ModalProvider = () => {
  const { modal } = useModalStore()

  switch (modal) {
    case 'CREATE_SERVER':
      return <ServerCreateModal />
    case 'INVITE_MEMBER':
      return <InviteMemberModal />
    default:
      return null
  }
}
