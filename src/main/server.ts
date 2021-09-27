import { prisma } from '@infra/db/prisma/client'
import 'dotenv/config'

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

process.on('unhandledRejection', (reason, promise) => {
  console.error(
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`
  )
  throw reason
})

process.on('uncaughtException', (error) => {
  console.error(`App exiting due to an uncaught exception: ${error}`)
  process.exit(ExitStatus.Failure)
})

prisma
  .$connect()
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(process.env.SERVER_PORT, () =>
      console.log(
        `Server start with successfully on PORT ${process.env.SERVER_PORT}`
      )
    )
  })
  .catch((error) => {
    console.error(`App exited with error: ${error}`)
    process.exit(ExitStatus.Failure)
  })
