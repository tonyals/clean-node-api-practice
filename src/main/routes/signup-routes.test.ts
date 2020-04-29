import request from 'supertest'
import app from '../config/app'

describe('SignUp routes', () => {
  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Tony Augusto',
        email: 'a@a.com',
        password: '12345',
        passwordConfirmation: '12345'
      })
      .expect(200)
  })
})
