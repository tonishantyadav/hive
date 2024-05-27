'use client'

import React from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { useModalStore } from '@/stores/modal'

export const ServerCreateButton = () => {
  const { onOpen } = useModalStore()

  return (
    <Button
      className="rounded-full bg-emerald-500 hover:rounded-xl hover:bg-emerald-500/80"
      size="icon"
      onClick={() => onOpen('CREATE_SERVER')}
    >
      <Plus />
    </Button>
  )
}
