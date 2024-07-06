import { MessageData } from '@/schemas/message'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useMessageCreate = () => {
  return useMutation({
    mutationFn: async (data: MessageData) => {
      const response = await axios.post('/api/socket/messages', data)
      return response.data
    },
  })
}
