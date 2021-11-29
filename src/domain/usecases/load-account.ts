import { AccountModelResult } from '@domain/account'

export interface LoadAccount {
  load: (accountId: string) => Promise<LoadAccountResult.Result>
}

export namespace LoadAccountResult {
  export type Result = AccountModelResult
}
