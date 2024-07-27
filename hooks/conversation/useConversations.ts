import { Conversation } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useConversations = (userId: string) => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const response = await axios.get<{ conversations: Conversation[] }>(
        '/api/conversations',
        {
          params: { userId },
        }
      )
      console.log(response.data)
      return response.data.conversations
    },
  })
}
