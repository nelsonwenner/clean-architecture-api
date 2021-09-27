import { AddAccount } from '@domain/usecases/add-account'

export interface AddAccountRepository {
  add: (accountData: AddAccount.Params) => Promise<AddAccount.Result>
}
