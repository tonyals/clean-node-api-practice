import { AccountRepository } from '../../../../data/protocols/account-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account-usecase'
import { AccountModel } from '../../../../domain/models/account-model'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AccountRepository {
  async addAccountRepository (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0])
  }
}
