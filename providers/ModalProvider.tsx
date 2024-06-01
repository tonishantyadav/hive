'use client'

import { ChannelCreateModal } from '@/components/channel'
import { InviteMemberModal } from '@/components/invite'
import { MemberManageModal } from '@/components/member'
import { ServerCreateModal } from '@/components/server'
import { useModalStore } from '@/stores/modal'

export const ModalProvider = () => {
  const { modal } = useModalStore()

  switch (modal) {
    case 'CREATE_SERVER':
      return <ServerCreateModal />
    case 'INVITE_MEMBER':
      return <InviteMemberModal />
    case 'MANAGE_MEMBER':
      return <MemberManageModal />
    case 'CREATE_CHANNEL':
      return <ChannelCreateModal />
    default:
      return null
  }
}
