import { z } from 'zod'

export type MessageData = {
  userId: string
  serverId: string
  channelId: string
  message?: string
  fileUrl?: string
}

export const MessageSchema = z.object({
  userId: z.string(),
  serverId: z.string(),
  channelId: z.string(),
  message: z.string().optional(),
  fileUrl: z.string().optional(),
})
