import { useModalStore } from '@/stores/modal'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGenerateInviteLink = () => {
  const { onClose } = useModalStore()
  return useMutation({
    mutationFn: async (serverId: string) => {
      const response = await axios.post('/api/invites', { serverId })
      return response.data
    },
  })
}
