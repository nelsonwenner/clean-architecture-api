import { prisma } from '@infra/db/prisma/client'
import { Account } from '@domain/account/account'
import { AddAccount } from '@domain/usecases/add-account'
import { AddAccountRepository, ExistsAccountRepository } from '@data/contracts'

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
}
