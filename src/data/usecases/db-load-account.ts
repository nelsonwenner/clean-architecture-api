import { LoadAccount } from '@domain/usecases'
import { LoadAccountRepository } from '@data/contracts'

export class DbLoadAccount implements LoadAccount {
  constructor(private readonly loadAccountRepository: LoadAccountRepository) {}

  async load(accountId: string): Promise<LoadAccountRepository.Result> {
    return this.loadAccountRepository.load(accountId)
  }
}
