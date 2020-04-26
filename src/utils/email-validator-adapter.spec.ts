import { EmailValidatorAdapter } from './email-validator-adapter'

describe('EmailValidator', () => {
  test('should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })
})
