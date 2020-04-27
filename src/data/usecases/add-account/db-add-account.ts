import {
  AddAccount,
  AddAccountModel,
  AccountModel,
  AccountRepository,
  Encrypter
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly addAccountRepository: AccountRepository
  private readonly encrypter: Encrypter

  constructor (addAccountRepository: AccountRepository, encrypter: Encrypter) {
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
