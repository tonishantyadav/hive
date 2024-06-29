'use client'

import { Button } from '@/components/ui/button'
import { useModalStore } from '@/stores/modal'
import { Plus } from 'lucide-react'

export const ServerCreateButton = () => {
  const { onOpen } = useModalStore()

  return (
    <Button
      className="rounded-full bg-indigo-500 hover:rounded-xl hover:bg-indigo-600"
      size="icon"
      onClick={() => onOpen('CREATE_SERVER')}
    >
      <Plus className="text-white" />
    </Button>
  )
}
