import { z } from 'zod'

export const ServerCreateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name is too long'),
})

export type ServerCreatedFormData = z.infer<typeof ServerCreateSchema>
