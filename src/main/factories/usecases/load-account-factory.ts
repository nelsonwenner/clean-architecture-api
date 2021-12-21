import { AccountPrismaRepository } from '@infra/db'
import { LoadAccount } from '@domain/usecases'
import { DbLoadAccount } from '@data/usecases'

export const makeDbLoadAccount = (): LoadAccount => {
  const accountPrismaRepository = new AccountPrismaRepository()
  return new DbLoadAccount(accountPrismaRepository)
}
