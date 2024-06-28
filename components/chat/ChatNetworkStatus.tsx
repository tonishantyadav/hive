'use client'

import { useSocket } from '@/providers/SocketProvider'
import { WifiIcon, WifiOffIcon } from 'lucide-react'

export const ChatNetworkStatus = () => {
  const { isConnected } = useSocket()
  return (
    <>
      {isConnected ? (
        <WifiIcon className="h-4 w-4 text-emerald-500" />
      ) : (
        <WifiOffIcon className="h-4 w-4 text-red-500" />
      )}
    </>
  )
}
