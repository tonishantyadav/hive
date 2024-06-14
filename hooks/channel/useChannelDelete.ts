import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useChannelDelete = () => {
  return useMutation({
    mutationFn: async ({
      serverId,
      channelId,
    }: {
      serverId: string
      channelId: string
    }) =>
      await axios.delete(`/api/channels/${channelId}`, {
        params: {
          serverId,
        },
      }),
  })
}
