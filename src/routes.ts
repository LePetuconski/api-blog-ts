import { Router } from 'express'
import { createAuthor, getAuthor, deleteAuthor, editAuthor } from './controllers/author-controller'
import { createPost, getPost, editPost, deletePost } from './controllers/post-controller'

export const router = Router()

router.post('/author', createAuthor)
router.get('/author', getAuthor)
router.put('/author/:id', editAuthor)
router.delete('/author/:id', deleteAuthor)

router.post('/post', createPost)
router.get('/post', getPost)
router.put('/post/:id', editPost)
router.delete('/post/:id', deletePost)

