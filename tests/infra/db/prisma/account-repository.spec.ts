import { AccountPrismaRepository } from '@infra/db/prisma/account-repository/account'

const makeSut = (): AccountPrismaRepository => {
  return new AccountPrismaRepository()
}

describe('Account prisma repository', () => {
  it('Should return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
  })
})
