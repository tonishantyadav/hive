'use client'

import { useSocket } from '@/providers/SocketProvider'
import { GlobeIcon, WifiIcon } from 'lucide-react'

export const ChatNetworkStatus = () => {
  const { isConnected } = useSocket()
  return (
    <>
      {isConnected ? (
        <GlobeIcon className="h-4 w-4 text-emerald-400 hover:text-emerald-500" />
      ) : (
        <WifiIcon className="h-4 w-4 text-orange-400 hover:text-orange-500" />
      )}
    </>
  )
}
