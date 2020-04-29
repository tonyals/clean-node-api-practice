import { Controller } from '../../presentation/protocols'
import { SignUpController } from '../../presentation/controllers/signup/signup-controller'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const encrypter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(accountMongoRepository, encrypter)
  const emailValidator = new EmailValidatorAdapter()
  return new SignUpController(emailValidator, addAccount)
}
