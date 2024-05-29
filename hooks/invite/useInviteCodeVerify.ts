import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useInviteCodeVerify = () => {
  return useMutation({
    mutationFn: async (inviteCode: string) => {
      const response = await axios.post('/api/invite/verify', { inviteCode })
      return response.data
    },
  })
}
