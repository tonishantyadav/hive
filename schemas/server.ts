import { z } from 'zod'

export type ServerCreatedFormData = z.infer<typeof ServerCreateSchema>

export const ServerCreateSchema = z.object({
  name: z.string().min(1, 'Name required').max(255, 'Name too long'),
  image: z.string().url('Image required').optional(),
})
