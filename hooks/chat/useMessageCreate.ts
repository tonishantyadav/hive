import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type messageData = {
  serverId: string
  channelId: string
  message?: string
  fileUrl?: string
}

export const useMessageCreate = () => {
  return useMutation({
    mutationFn: async (data: messageData) => {
      const response = await axios.post('/api/socket/messages', data)
      return response.data
    },
  })
}
