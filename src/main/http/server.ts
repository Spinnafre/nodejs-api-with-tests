
import { app } from './app'
import { shutdown } from './helpers/shutdown'
import { startHTTPServer } from './helpers/startServer'
  ; (async () => {
    await startHTTPServer(app)
  })()

process.on('SIGINT', shutdown(0, 'SIGINT'))
process.on('SIGTERM', shutdown(0, 'SIGTERM'))

// Let it crash when has programmer errors
process.on('uncaughtException', shutdown(1, 'Unexpected Error'))
process.on('unhandledRejection', shutdown(1, 'Unhandled Promise'))
