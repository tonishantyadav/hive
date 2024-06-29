import { z } from 'zod'

export const messageSchema = z.object({
  serverId: z.string().min(1, 'serverId is required'),
  channelId: z.string().min(1, 'channelId is required'),
  message: z.string().optional(),
  fileUrl: z.string().url('Invalid URL format for fileUrl').optional(),
})
