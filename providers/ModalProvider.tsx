'use client'

import { ChannelCreateModal, ChannelDeleteModal } from '@/components/channel'
import { InviteMemberModal } from '@/components/invite'
import { MemberManageModal } from '@/components/member'
import {
  ServerCreateModal,
  ServerDeleteModal,
  ServerLeaveModal,
} from '@/components/server'
import { useModalStore } from '@/stores/modal'

export const ModalProvider = () => {
  const { modal } = useModalStore()

  switch (modal) {
    case 'CREATE_SERVER':
      return <ServerCreateModal />
    case 'DELETE_SERVER':
      return <ServerDeleteModal />
    case 'LEAVE_SERVER':
      return <ServerLeaveModal />
    case 'CREATE_CHANNEL':
      return <ChannelCreateModal />
    case 'DELETE_CHANNEL':
      return <ChannelDeleteModal />
    case 'INVITE_MEMBER':
      return <InviteMemberModal />
    case 'MANAGE_MEMBER':
      return <MemberManageModal />
    default:
      return null
  }
}
