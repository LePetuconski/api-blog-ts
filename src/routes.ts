import { Router } from 'express'
import { createAuthor } from './controllers/author-controller'

export const router = Router()

router.post('/author', (req, res) => createAuthor(req, res))