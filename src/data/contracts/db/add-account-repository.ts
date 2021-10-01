import { AddAccount } from '@domain/usecases'

export interface AddAccountRepository {
  add: (accountData: AddAccount.Params) => Promise<AddAccount.Result>
}
