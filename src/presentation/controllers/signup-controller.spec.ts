import { SignUpController } from './signup-controller'

describe('SignUpController', () => {
  test('should return 400 if no name is provided', () => {
    const sut = new SignUpController()
    const httpResponse = sut.handle({
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(new Error('Missing Param: name'))
  })

  test('should return 400 if no email is provided', () => {
    const sut = new SignUpController()
    const httpResponse = sut.handle({
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toEqual(new Error('Missing Param: email'))
  })
})
