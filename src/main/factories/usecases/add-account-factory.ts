import { AccountPrismaRepository } from '@infra/db/prisma/account-repository/account'
import { BcryptAdapter } from '@infra/criptography'
import { DbAddAccount } from '@data/usecases'
import { AddAccount } from '@domain/usecases'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountPrismaRepository = new AccountPrismaRepository()
  return new DbAddAccount(bcryptAdapter, accountPrismaRepository)
}
