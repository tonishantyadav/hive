import { useChannels } from '@/hooks/channel/useChannels'
import prisma from '@/prisma/client'
import { notFound, useSearchParams } from 'next/navigation'

export const ChannelList = () => {
  const params = useSearchParams()
  const serverId = params.get('server')

  return <div className="h-full w-full"></div>
}
