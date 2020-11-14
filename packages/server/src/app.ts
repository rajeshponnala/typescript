import cors from 'cors'
import express, { Express } from 'express'
import helmet from 'helmet'
import { unauthorisedErrorHandler } from './middleware'
import { router } from './routes'

const addMiddleware: (app: Express) => Express = app => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(
    cors({
      credentials: true,
      origin: (process.env.CORS_ORIGINS || '').split(','),
    }),
  )
  app.use(helmet())
  if (process.env.NODE_ENV !== 'CI' && process.env.NODE_ENV !== 'test') {
    // const swaggerDoc = load(`${__dirname}/api-docs/nodejs-seed.yaml`)
    // app.use('/api-docs', serve, setup(swaggerDoc))
  }

  app.use(router)
  app.use('/', (_, res) => res.json({ message: 'Welcome' }))
  app.use(unauthorisedErrorHandler)

  return app
}

const startApp: () => Express = () => {
  const app: Express = express()
  addMiddleware(app)
  return app
}

export const app: Express = startApp()
