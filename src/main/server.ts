import 'module-alias/register'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

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

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () =>
      console.log(`Server start with successfully on PORT ${env.port}`)
    )
  })
  .catch((error) => {
    console.error(`App exited with error: ${error}`)
    process.exit(ExitStatus.Failure)
  })
