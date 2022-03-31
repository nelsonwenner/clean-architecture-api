import { HttpResponse, Controller } from '@presentation/contracts'
import { Validation } from '@data/contracts/validation'
import { Authentication } from '@domain/usecases'
import {
  badRequest,
  serverError,
  unauthorized,
  ok,
} from '@presentation/helpers/http-helper'

export class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle(request: LoginController.Request): Promise<HttpResponse> {
    try {
      const { email, password } = request

      const error = this.validation.validate({
        email,
        password,
      })

      if (error) {
        return badRequest(error)
      }

      const authenticationModel = await this.authentication.auth({
        email,
        password,
      })

      if (!authenticationModel) {
        return unauthorized()
      }

      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
