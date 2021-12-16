import { HttpResponse, Controller } from '@presentation/contracts'
import { LoadAccount } from '@domain/usecases'
import { noContent, serverError, ok } from '@presentation/helpers/http-helper'

export class MeController implements Controller {
  constructor(private readonly loadAccount: LoadAccount) {}

  async handle(request: MeController.Request): Promise<HttpResponse> {
    try {
      const account = await this.loadAccount.load(request.accountId)
      return account ? ok(account) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace MeController {
  export type Request = {
    accountId: string
  }
}
