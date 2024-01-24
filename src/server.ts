import 'dotenv/config'

import express from 'express'
import { prisma } from './lib/prisma'
import { router } from './routes'

export const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/api', router)

async function bootstrap() {
  await prisma.$connect().then(() => {
    console.log('Database is running!')
  })

  app.listen(port, () => {
    console.log('Application is running!')
  })
}

bootstrap()