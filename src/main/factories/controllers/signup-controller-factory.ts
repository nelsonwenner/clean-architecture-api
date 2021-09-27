import { SignUpController } from '@presentation/controllers/signup'
import { makeDbAddAccount, makeDbExistsAccount } from '@main/factories'
import { EmailValidatorAdapter } from '@infra/validators'
import {
  ValidationComposite,
  RequiredFieldValidation,
} from '@validation/validators'
import { Validation } from '@validation/contracts'

export const makeSignUpController = (): SignUpController => {
  const validations: Validation[] = [
    new RequiredFieldValidation('name'),
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
  ]

  const validationComposite = new ValidationComposite(validations)
  const emailValidatorAdapter = new EmailValidatorAdapter()
  return new SignUpController(
    emailValidatorAdapter,
    validationComposite,
    makeDbAddAccount(),
    makeDbExistsAccount()
  )
}
