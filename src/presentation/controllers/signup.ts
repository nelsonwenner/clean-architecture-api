import { HttpRequest, HttpResponse, Controller } from '@presentation/contracts'
import { badRequest, serverError, ok } from '@presentation/helpers/http-helper'
import { AddAccount, ExistsAccount } from '@domain/usecases'
import { EmailInUseError } from '@presentation/errors'
import { Validation } from '@data/contracts/validation'

export class SignUpController implements Controller {
  constructor(
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
