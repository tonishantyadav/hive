import { useSocket } from '@/providers/SocketProvider'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useMessages = (channelId: string) => {
  const { isConnected } = useSocket()

  return useInfiniteQuery({
    queryKey: ['channel', channelId],
    queryFn: async ({ pageParam }) => {
      const response = await axios.get('/api/messages', {
        params: {
          channelId: channelId,
          cursor: pageParam,
        },
      })
      return response.data
    },
    initialPageParam: null,
    refetchInterval: isConnected ? false : 1000,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage, pages) => firstPage.nextCursor,
  })
}
