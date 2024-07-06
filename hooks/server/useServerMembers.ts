import { MemberWithUser } from '@/components/channel/ChannelBody'
import { User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import ms from 'ms'

export const useServerMembers = (serverId: string) => {
  return useQuery({
    queryKey: ['members', serverId],
    queryFn: async () => {
      const response = await axios.get<MemberWithUser[]>(`/api/members`, {
        params: {
          server: serverId,
        },
      })
      return response.data
    },
    staleTime: ms('2m'),
  })
}
