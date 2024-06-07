import { DbHelper } from '@/shared/infra/database/helper';
import { ENV } from '../../config/env';
import { app } from '../app';

const startServer = async () => {
  //   const connection = await dbConnection()
  await DbHelper.connect();

  app.log.info({ actor: 'Database' }, 'Connected 🚀')

  const address = await app.listen({
    host: ENV.HTTP_HOST,
    port: ENV.HTTP_PORT,
  })

  app.log.info(`Server is running in ${address}`)

  return address
}

const closeServer = async () => {
  console.log('Closing Database connection...')
  await DbHelper.disconnect()
  console.log('Database connection closed.')

  console.log('Closing app connections...')
  await app.close()
  console.log('Connections closed successfully')
}

// Gracefully shutdown
function shutdown(code: number, reason: string) {
  return async (signal: NodeJS.Signals) => {
    console.log(`[${reason}] Received signal to terminate: ${signal}`)
    try {
      // If server is closed before then remove timeout from
      // event loop
      setTimeout(() => {
        process.exit(code)
      }, 3000).unref()

      await closeServer()

      process.exit(code)
    } catch (error) {
      console.error('Error during shutdown:', error)
      process.exit(1)
    }
  }
}

export {
  shutdown,
  startServer,
  closeServer
}
