export interface LoadAccountRepository {
  load: (accountId: string) => Promise<LoadAccountRepository.Result>
}

export namespace LoadAccountRepository {
  export type Result = {
    id: string
    name: string
    email: string
  }
}
