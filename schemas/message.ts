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

export type MessageUpdateOrDeleteData = {
  userId: string
  serverId: string
  channelId: string
  messageId: string
  messageContent?: string
}

export const MessageEditSchema = z.object({
  message: z
    .string()
    .min(1, 'Message is too short')
    .max(255, 'Message is too long')
    .optional(),
})
