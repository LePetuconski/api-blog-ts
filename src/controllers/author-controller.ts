import { Author } from '@prisma/client'
import { authorSchema, authorUpdateSchema } from '../dtos/author-dto'
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

export async function getAuthor(req: Request, res: Response) {
  const { id } = req.query 

  let author: Author | Author[]

  if (id) {
    author = await prisma.author.findUnique({
      where: {
        id: parseInt(id as string)
      }
    })
  } else {
    author = await prisma.author.findMany()
  } 

  return res.status(200).send(author)
  
  // if (id) {
  //   const author = await prisma.author.findUnique({
  //     where: {
  //       id: parseInt(id as string) 
  //     }
  //   })
  //   return res.status(200).send(author)
  // }
  // const author = await prisma.author.findMany()
  // return res.status(200).send(author)

}

export async function editAuthor(req: Request, res: Response) {
 const { id } = req.params

 if (!id) {
  return res.status(401).send("error")
 }

 const author = await prisma.author.findUnique({
  where: {
    id: parseInt(id as string) 
  }
 })

 if (!author) {
  return res.status(404).send("error")
 }

 const data = await authorUpdateSchema.parseAsync(req.body)

 await prisma.author.update({
  data, 
  where: {
    id: parseInt(id as string)
  }
 })

 return res.status(200).send("ok")
}

export async function deleteAuthor(req: Request, res: Response) {
  const { id } = req.params

  if (!id) {
    return res.status(401).send("error")
  }

  const author = await prisma.author.findUnique({
    where: {
      id: parseInt(id as string) 
    }
  })

  if (!author) {
    return res.status(404).send("error")
  }

  await prisma.author.delete({
    where: {
      id: parseInt(id as string)
    }
  })

  return res.status(200).send('ok')
}