import express from 'express'
import setupMiddlewares from '@main/config/middlewares'
import setupRouter from '@main/config/routes'

const app = express()
setupMiddlewares(app)
setupRouter(app)
export default app
