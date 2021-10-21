import {
  AddAccountRepository,
  ExistsAccountRepository,
  LoadAccountByEmailRepository,
  LoadAccountByTokenRepository,
  LoadAccountRepository,
} from '@data/contracts'
import { AddAccount } from '@domain/usecases/add-account'
import { prisma } from '@infra/db/prisma/client'
import { Account } from '@domain/account/account'

export class AccountPrismaRepository
  implements AddAccountRepository, ExistsAccountRepository {
  async add(accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const account = Account.create(accountData)
    return await prisma.account.create({
      data: {
        id: account.id,
        ...account.props,
      },
    })
  }

  async exists(email: string): Promise<boolean> {
    const userExists = await prisma.account.findUnique({
      where: { email },
    })
    return !!userExists
  }

  async load(accountId: string): Promise<LoadAccountRepository.Result> {
    const { id, name, email } = await prisma.account.findUnique({
      where: { id: accountId },
    })
    return { id, name, email }
  }

  async loadByEmail(
    email: string
  ): Promise<LoadAccountByEmailRepository.Result> {
    const account = await prisma.account.findUnique({
      where: { email },
    })
    return account
  }

  async loadByToken(
    token: string,
    role?: string
  ): Promise<LoadAccountByTokenRepository.Result> {
    const account = await prisma.account.findUnique({
      where: { accessToken: token },
    })
    return account
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    await prisma.account.update({
      where: { id },
      data: { accessToken: token },
    })
  }
}
