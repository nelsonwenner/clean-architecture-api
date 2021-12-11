import 'dotenv/config'
import { LoadAccountByToken } from '@domain/usecases'
import { DbLoadAccountByToken } from '@data/usecases'
import { AccountPrismaRepository } from '@infra/db'
import { JwtAdapter } from '@infra/criptography'

export const makeDbExistsAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
  const accountPrismaRepository = new AccountPrismaRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountPrismaRepository)
}
