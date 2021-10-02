import { AccountPrismaRepository } from '@infra/db/prisma/account-repository/account'
import { ExistsAccount } from '@domain/usecases'
import { DbExistsAccount } from '@data/usecases'

export const makeDbExistsAccount = (): ExistsAccount => {
  const accountPrismaRepository = new AccountPrismaRepository()
  return new DbExistsAccount(accountPrismaRepository)
}
