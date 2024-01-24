import { z } from 'zod'

export const postSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  content: z.string(),
  image: z.string().optional(),
  authorId: z.coerce.number()
})

export const postUpdateSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  content: z.string().optional(),
  image: z.string().optional()
})