import { makeDbLoadAccount } from '@main/factories'
import { Controller } from '@presentation/contracts'
import { MeController } from '@presentation/controllers'

export const makeMeAccountController = (): Controller => {
  return new MeController(makeDbLoadAccount())
}
