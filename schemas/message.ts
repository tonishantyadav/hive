import { z } from 'zod'

export const messageSchema = z.object({
  serverId: z.string().min(1, 'serverId is required'),
  channelId: z.string().min(1, 'channelId is required'),
  message: z.string().min(1, 'message is required'),
  fileUrl: z.string().url('Invalid URL format for fileUrl').optional(),
})
