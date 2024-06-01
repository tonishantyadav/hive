import { z } from 'zod'

export const ServerCreateSchema = z.object({
  imageUrl: z.string().url('Server image is required').optional(),
  name: z
    .string()
    .min(1, 'Server name is required')
    .max(255, 'Server name is too long'),
})

export type ServerCreatedFormData = z.infer<typeof ServerCreateSchema>
