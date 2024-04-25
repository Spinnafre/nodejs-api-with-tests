// import mongoose from 'mongoose'
import { setTimeout } from 'node:timers'
import { app } from '../app'

export function shutdown(code: number, reason: string) {
  return async (signal: NodeJS.Signals) => {
    console.log(`[${reason}] Received signal to terminate: ${signal}`)
    try {
      // If server is closed before then remove timeout from
      // event loop
      setTimeout(() => {
        process.exit(code)
      }, 3000).unref()

      console.log('Closing Database connection...')
      //   await mongoose.connection.close()
      console.log('Database connection closed.')

      console.log('Closing app connections...')
      await app.close()
      console.log('Connections closed successfully')

      process.exit(code)
    } catch (error) {
      console.error('Error during shutdown:', error)
      process.exit(1)
    }
  }
}
