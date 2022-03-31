import { ok, noContent } from '@presentation/helpers/http-helper'
import { LoadAccount, LoadAccountResult } from '@domain/usecases'
import { MeController } from '@presentation/controllers'

import faker from 'faker'

const mockRequest = (): MeController.Request => ({
  accountId: faker.datatype.uuid(),
})

interface SutTypes {
  sut: MeController
  loadAccountSpy: LoadAccountSpy
}

const makeSut = (): SutTypes => {
  const loadAccountSpy = new LoadAccountSpy()
  const sut = new MeController(loadAccountSpy)
  return {
    sut,
    loadAccountSpy,
  }
}

export class LoadAccountSpy implements LoadAccount {
  result = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
  }

  async load(accountId: string): Promise<LoadAccountResult.Result> {
    if (accountId === '') {
      return
    }
    this.result.id = accountId
    return this.result
  }
}

describe('Me Controller', () => {
  it('Should return 200 with an account result', async () => {
    const { sut, loadAccountSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadAccountSpy.result))
  })

  it('Should return 204 with not content', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ accountId: '' })
    expect(httpResponse).toEqual(noContent())
  })
})
