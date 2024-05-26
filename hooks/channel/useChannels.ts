import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useChannels = (serverId: string) => {
  return useQuery({
    queryKey: [serverId, 'channels'],
    queryFn: async () => {
      const response = await axios.get('/api/channels', {
        params: {
          server: serverId,
        },
      })
      return response.data
    },
  })
}
