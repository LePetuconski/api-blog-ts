import { z } from 'zod'

export const authorSchema = z.object({
  name: z.string(),
  bio: z.string(),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
})

export const authorUpdateSchema = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
  email: z.string().email({ message: 'Digite um e-mail válido' }).optional(),
})