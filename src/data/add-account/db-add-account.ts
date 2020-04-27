import { AddAccount, AddAccountModel } from '../../domain/usecases/add-account-usecase'
import { AccountModel } from '../../domain/models/account-model'
import { AddAccountRepository } from '../protocols/add-account-repository'

export class DbAddAccount implements AddAccount {
  private readonly addAccountRepository: AddAccountRepository
  constructor (addAccountRepository: AddAccountRepository) {
    this.addAccountRepository = addAccountRepository
  }

  async addAccount (accountData: AddAccountModel): Promise<AccountModel> {
    await this.addAccountRepository.addAccountRepository(accountData)
    return new Promise(resolve => resolve(null))
  }
}
