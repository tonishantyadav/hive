import { ChannelCategory } from '@prisma/client'
import { z } from 'zod'

export type ChannelCreateFormData = z.infer<typeof ChannelCreateSchema>

export const ChannelCreateSchema = z.object({
  serverId: z.string().optional(),
  channelName: z
    .string()
    .min(1, 'Channel name is required')
    .max(255, 'Channel name is too long')
    .refine((name) => name !== 'general', "Channel name cannot be 'general'"),
  channelCategory: z.nativeEnum(ChannelCategory),
})

export const ChannelEditSchema = z.object({
  channelName: z
    .string()
    .min(1, 'Channel name is required')
    .max(255, 'Channel name is too long')
    .refine((name) => name !== 'general', "Channel name cannot be 'general'"),
})
