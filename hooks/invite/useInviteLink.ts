import { useModalStore } from '@/stores/modal'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useInviteLink = () => {
  return useMutation({
    mutationFn: async (serverId: string) => {
      const response = await axios.post('/api/invite', { serverId })
      return response.data
    },
  })
}
