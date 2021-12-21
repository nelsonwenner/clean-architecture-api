import 'dotenv/config'
import { BcryptAdapter, JwtAdapter } from '@infra/criptography'
import { AccountPrismaRepository } from '@infra/db'
import { DbAuthentication } from '@data/usecases'
import { Authentication } from '@domain/usecases'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
  const accountPrismaRepository = new AccountPrismaRepository()
  return new DbAuthentication(
    accountPrismaRepository,
    accountPrismaRepository,
    bcryptAdapter,
    jwtAdapter
  )
}
