import { ExistsAccountRepository } from '@data/contracts'
import { ExistsAccount } from '@domain/usecases'

export class DbExistsAccount implements ExistsAccount {
  constructor(
    private readonly existsAccountRepository: ExistsAccountRepository
  ) {}

  async exists(email: string): Promise<boolean> {
    return await this.existsAccountRepository.exists(email)
  }
}
