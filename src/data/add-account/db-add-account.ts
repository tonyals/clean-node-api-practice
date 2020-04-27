import { AddAccount, AddAccountModel } from '../../domain/usecases/add-account-usecase'
import { AccountModel } from '../../domain/models/account-model'
import { AddAccountRepository } from '../protocols/add-account-repository'
import { Encrypter } from '../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  private readonly addAccountRepository: AddAccountRepository
  private readonly encrypter: Encrypter

  constructor (addAccountRepository: AddAccountRepository, encrypter: Encrypter) {
    this.addAccountRepository = addAccountRepository
    this.encrypter = encrypter
  }

  async addAccount (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepository
      .addAccountRepository(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
