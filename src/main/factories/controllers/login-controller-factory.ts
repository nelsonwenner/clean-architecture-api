import { makeDbAuthentication } from '@main/factories'
import { LoginValidatorAdapter } from '@infra/validators'
import { Controller } from '@presentation/contracts'
import { LoginController } from '@presentation/controllers'

export const makeLoginController = (): Controller => {
  return new LoginController(
    makeDbAuthentication(),
    new LoginValidatorAdapter()
  )
}
