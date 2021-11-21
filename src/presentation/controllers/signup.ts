import { HttpResponse, Controller } from '@presentation/contracts'
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

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const { name, email, password } = request

      const error = this.validation.validate({
        name,
        email,
        password,
      })

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

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
  }
}
