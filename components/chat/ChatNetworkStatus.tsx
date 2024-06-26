'use client'

import { cn } from '@/lib/utils'
import { useSocket } from '@/providers/SocketProvider'
import { GlobeIcon, WifiIcon } from 'lucide-react'

export const ChatNetworkStatus = () => {
  const { isConnected } = useSocket()
  return (
    <WifiIcon
      className={cn(
        'h-4 w-4',
        isConnected
          ? 'text-emerald-400 hover:text-emerald-500'
          : 'text-red-400 hover:text-red-500'
      )}
    />
  )
}
