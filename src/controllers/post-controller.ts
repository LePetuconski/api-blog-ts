import { Post } from '@prisma/client'
import { postSchema, postUpdateSchema } from '../dtos/post-dto'
import { prisma } from '../lib/prisma'
import type { Request, Response } from 'express'

export async function createPost(req: Request, res: Response) {
  const { title, subtitle, content, image, authorId } = await postSchema.parseAsync(req.body)

  const post = await prisma.post.create({
    data: {
      title,
      subtitle,
      content,
      image,
      authorId
    }
  })

  return res.status(200).send(post)
}

export async function getPost(req: Request, res: Response) {
  const { id } = req.query

  let post: Post | Post[]

  if (id) {
    post = await prisma.post.findUnique({
      where: {
        id: parseInt(id as string)
      },
      include: {
        // author: true
        author: {
          select: {
            bio: true,
            name: true,
            email: true
          }
        }
      }
    })
  } else {
    post = await prisma.post.findMany({
      include: {
        author: {
          select: {
            bio: true,
            name: true,
            email: true
          }
        }
      }
    })
  }

  return res.status(200).send(post)
}

export async function editPost(req: Request, res: Response) {
  const { id } = req.params

  if (!id) {
    return res.status(401).send("error")
  }

  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id as string)
    }
  })

  if (!post) {
    return res.status(404).send("error")
  }

  const data = await postUpdateSchema.parseAsync(req.body)
  
  await prisma.post.update({
    data,
    where: {
      id: parseInt(id as string)
    }
  })

  return res.status(200).send("ok")
}

export async function deletePost(req: Request, res: Response) {
  const { id } = req.params

  if (!id) {
    return res.status(401).send("error")
  }
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id as string) 
    }
  })

  if (!post) {
    return res.status(404).send("error")
  }

  await prisma.post.delete({
    where: {
      id: parseInt(id as string)
    }
  })

  return res.status(200).send('ok')
}