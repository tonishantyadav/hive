import { ChannelCreateFormData } from '@/schemas/channel'
import { ChannelCategory } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useChannelCreate = () => {
  return useMutation({
    mutationFn: async (data: ChannelCreateFormData) =>
      await axios.post('/api/channels', { ...data }),
  })
}
