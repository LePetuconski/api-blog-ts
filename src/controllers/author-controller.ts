import { authorSchema } from '../dtos/author-dto'
import { prisma } from '../lib/prisma'
import type { Request, Response } from 'express'

export async function createAuthor(req: Request, res: Response) {
  const { name, bio, email } = await authorSchema.parseAsync(req.body)

  const author = await prisma.author.create({
    data: {
      name,
      bio,
      email
    }
  })

  return res.status(200).send(author)
}