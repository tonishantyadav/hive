'use client'

import { ManageMemberModal, ServerCreateModal } from '@/components/server'
import { InviteMemberModal } from '@/components/invite'
import { useModalStore } from '@/stores/modal'

export const ModalProvider = () => {
  const { modal } = useModalStore()

  switch (modal) {
    case 'CREATE_SERVER':
      return <ServerCreateModal />
    case 'INVITE_MEMBER':
      return <InviteMemberModal />
    case 'MANAGE_MEMBER':
      return <ManageMemberModal />
    default:
      return null
  }
}
