import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('any_hash'))
  }
}))

const salt = 12
describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const sut = new BcryptAdapter(salt)
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_password')
    expect(bcryptSpy).toHaveBeenCalledWith('any_password', salt)
  })

  test('should return a hash on success', async () => {
    const sut = new BcryptAdapter(salt)
    const hash = await sut.encrypt('any_password')
    expect(hash).toBe('any_hash')
  })

  test('should throw if Bcrypt throws', async () => {
    const sut = new BcryptAdapter(salt)
    jest.spyOn(bcrypt, 'hash')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.encrypt('any_password')
    await expect(promise).rejects.toEqual(new Error())
  })
})
