import { z } from 'zod'

export const authorSchema = z.object({
  name: z.string(),
  bio: z.string(),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
})
