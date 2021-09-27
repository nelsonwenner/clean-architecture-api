import { HttpRequest, HttpResponse, Controller } from '@presentation/contracts'
import { badRequest, serverError, ok } from '@presentation/helpers/http-helper'
import { InvalidParamError, EmailInUseError } from '@presentation/errors'
import { AddAccount, ExistsAccount } from '@domain/usecases'
import { EmailValidator, Validation } from '@validation/contracts'

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly validation: Validation,
    private readonly addAccount: AddAccount,
    private readonly existsAccount: ExistsAccount
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password } = httpRequest.body

      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const exists = await this.existsAccount.exists(email)
      if (exists) {
        return badRequest(new EmailInUseError())
      }

      const { id } = await this.addAccount.add({
        name,
        email,
        password,
      })
      return ok({ id: id })
    } catch (error) {
      return serverError(error)
    }
  }
}
