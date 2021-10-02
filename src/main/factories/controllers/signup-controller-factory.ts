import { SignUpController } from '@presentation/controllers/signup'
import { makeDbAddAccount, makeDbExistsAccount } from '@main/factories'
import { FieldValidatorAdapter } from '@infra/validators'

export const makeSignUpController = (): SignUpController => {
  return new SignUpController(
    new FieldValidatorAdapter(),
    makeDbAddAccount(),
    makeDbExistsAccount()
  )
}
