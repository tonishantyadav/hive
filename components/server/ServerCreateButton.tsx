'use client'

import { Button } from '@/components/ui/button'
import { useModalStore } from '@/stores/modal'
import { Plus } from 'lucide-react'

export const ServerCreateButton = () => {
  const { onOpen } = useModalStore()

  return (
    <Button
      className="rounded-full"
      size="icon"
      variant="secondary"
      onClick={() => onOpen('CREATE_SERVER')}
    >
      <Plus className="text-white" />
    </Button>
  )
}
