import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '@/main/config/app'
import request from 'supertest'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

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
