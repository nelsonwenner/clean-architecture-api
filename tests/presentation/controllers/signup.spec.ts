import { ServerError } from '@presentation/errors'
import { Validation } from '@data/contracts/validation'
import { SignUpController } from '@presentation/controllers'
import { AddAccount, ExistsAccount } from '@domain/usecases'
import { FieldValidatorAdapter } from '@infra/validators'
import { badRequest } from '@presentation/helpers/http-helper'

interface SutTypes {
  sut: SignUpController
  fieldValidationStub: Validation
  addAccountStub: AddAccount
  existsAccountStub: ExistsAccount
}

const makeFieldValidation = (): Validation => {
  return new FieldValidatorAdapter()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccount.Params): Promise<AddAccount.Result> {
      const fakeAccount = {
        id: 'valid_id',
      }
      return new Promise((resolve) => resolve(fakeAccount))
    }
  }
  return new AddAccountStub()
}

const makeDbExistsAccount = (): ExistsAccount => {
  class ExistsAccountStub implements ExistsAccount {
    async exists(): Promise<boolean> {
      return new Promise((resolve) => resolve(false))
    }
  }
  return new ExistsAccountStub()
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const existsAccountStub = makeDbExistsAccount()
  const fieldValidationStub = makeFieldValidation()
  const sut = new SignUpController(
    fieldValidationStub,
    addAccountStub,
    existsAccountStub
  )
  return {
    sut,
    fieldValidationStub,
    existsAccountStub,
    addAccountStub,
  }
}

const mockRequest = (): SignUpController.Request => {
  return {
    name: 'any_name',
    email: 'any_email@gmail.com',
    password: 'any_password',
  }
}

describe('SignUp Controller', () => {
  it('Should return 400 if Validation returns an error', async () => {
    const { sut, fieldValidationStub } = makeSut()
    jest.spyOn(fieldValidationStub, 'validate').mockImplementationOnce(() => {
      return new Error('name is a required')
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      badRequest(new Error('name is a required')).body
    )
  })

  it('Should return 400 if an invalid email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      name: 'any_name',
      email: 'invalid_emaicom',
      password: 'any_password',
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      badRequest(new Error('must be a valid email')).body
    )
  })

  it('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error('error')))
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError('error'))
  })

  it('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: 'any_password',
    })
  })

  it('Should return 403 email in use', async () => {
    const { sut, existsAccountStub } = makeSut()
    jest.spyOn(existsAccountStub, 'exists').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => resolve(true))
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      badRequest(new Error('The received email is already in use')).body
    )
  })

  it('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
    })
  })
})
