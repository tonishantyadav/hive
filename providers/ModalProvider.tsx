'use client'

import { InviteMemberModal, ServerCreateModal } from '@/components/server'
import { useModalStore } from '@/stores/modal'
import { useEffect, useState } from 'react'

export const ModalProvider = () => {
  const { modal } = useModalStore()

  return (
    <>
      {modal === 'CREATE_SERVER' && <ServerCreateModal />}
      {modal === 'INVITE_MEMBER' && <InviteMemberModal />}
    </>
  )
}
