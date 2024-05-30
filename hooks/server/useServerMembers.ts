import { User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import ms from 'ms'

export const useServerMembers = (severId: string) => {
  return useQuery({
    queryKey: [severId],
    queryFn: async () => {
      const response = await axios.get<User[]>(`/api/members`, {
        params: {
          server: severId,
        },
      })
      return response.data
    },
    staleTime: ms('2m'),
  })
}
