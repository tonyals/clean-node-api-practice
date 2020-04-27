import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

const salt = 12
describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const sut = new BcryptAdapter(salt)
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_password')
    expect(bcryptSpy).toHaveBeenCalledWith('any_password', salt)
  })
})
