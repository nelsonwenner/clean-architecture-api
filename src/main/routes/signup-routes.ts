import { adaptRoute } from '@main/adapters/express-route-adapter'
import { makeSignUpController } from '@main/factories/controllers'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
