import { DbAddAccount } from './db-add-account'
import { AddAccountRepository } from '../protocols/add-account-repository'
import { AddAccountModel } from '../../domain/usecases/add-account-usecase'
import { AccountModel } from '../../domain/models/account-model'

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async addAccountRepository (accountData: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new AddAccountRepositoryStub()
}

interface SutTypes {
  addAccountRepositoryStub: AddAccountRepository
  sut: DbAddAccount
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(addAccountRepositoryStub)
  return { sut, addAccountRepositoryStub }
}

describe('DbAddAccount', () => {
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
      password: 'valid_password'
    })
  })
})
