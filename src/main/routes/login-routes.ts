import { adaptRoute } from '@main/adapters/express-route-adapter'
import {
  makeSignUpController,
  makeLoginController,
  makeMeAccountController,
} from '@main/factories'
import { auth } from '@main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
  router.get('/me', auth, adaptRoute(makeMeAccountController()))
}
