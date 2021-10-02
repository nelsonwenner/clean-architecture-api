import { prisma } from '@infra/db/prisma/client'

beforeAll(async () => {
  await prisma.$transaction([prisma.account.deleteMany()])
  await prisma.$disconnect()
})

afterEach(async () => {
  await prisma.$transaction([prisma.account.deleteMany()])
  await prisma.$disconnect()
})
