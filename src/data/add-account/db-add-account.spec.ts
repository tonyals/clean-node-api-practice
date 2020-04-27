import { DbAddAccount } from './db-add-account'
import { AddAccountRepository } from '../protocols/add-account-repository'
import { AddAccountModel } from '../../domain/usecases/add-account-usecase'
import { AccountModel } from '../../domain/models/account-model'
import { Encrypter } from '../protocols/encrypter'

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async addAccountRepository (accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_password'
      }
      return new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountRepositoryStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

interface SutTypes {
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
  sut: DbAddAccount
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(addAccountRepositoryStub, encrypterStub)
  return { sut, addAccountRepositoryStub, encrypterStub }
}

describe('DbAddAccount', () => {
  test('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.addAccount(account)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('should DbAddAccount throws if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const promise = sut.addAccount(account)
    await expect(promise).rejects.toEqual(new Error())
  })

  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addAccountSpy = jest.spyOn(addAccountRepositoryStub, 'addAccountRepository')
    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.addAccount(account)
    expect(addAccountSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('should DbAddAccount throws if AddAccountRepoitory throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'addAccountRepository')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    }
    const promise = sut.addAccount(account)
    await expect(promise).rejects.toEqual(new Error())
  })

  test('should DbAddAccount returns an account on success', async () => {
    const { sut } = makeSut()
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    }
    const account = await sut.addAccount(accountData)
    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })
})
