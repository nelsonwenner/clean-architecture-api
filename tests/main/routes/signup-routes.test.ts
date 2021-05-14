import request from 'supertest'
import app from '@/main/config/app'

describe('SignUp Routes', () => {
  test('Should return 200 on signup', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Wenner',
        email: 'wenner@gmail.com',
        password: '123',
        passwordConfirmation: '123',
      })
      .expect(200)
  })
})
