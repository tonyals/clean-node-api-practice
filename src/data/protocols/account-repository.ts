import { AddAccountModel } from '../../domain/usecases/add-account-usecase'
import { AccountModel } from '../../domain/models/account-model'

export interface AccountRepository {
  addAccountRepository (accountData: AddAccountModel): Promise<AccountModel>
}
