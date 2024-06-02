import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useServerDelete = () => {
  return useMutation({
    mutationFn: async (serverId: string) =>
      await axios.delete(`/api/servers/${serverId}`),
  })
}
