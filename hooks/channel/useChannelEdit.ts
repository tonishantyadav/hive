import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useChannelEdit = () => {
  return useMutation({
    mutationFn: async ({
      serverId,
      channelId,
      channelName,
    }: {
      serverId: string
      channelId: string
      channelName: string
    }) =>
      await axios.patch(
        `/api/channels/${channelId}`,
        { channelName },
        { params: { serverId } }
      ),
  })
}
