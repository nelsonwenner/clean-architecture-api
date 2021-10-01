import app from '@main/config/app'
import request from 'supertest'

describe('SignUp Routes', () => {
  it('Should return 200 on signup', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Wenner',
        email: 'wenner@gmail.com',
        password: '123',
      })
      .expect(200)
  })
})
