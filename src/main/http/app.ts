import "reflect-metadata"
import fastify from 'fastify'
import { ENV } from '../config/env'

const app = fastify({
  logger: {
    enabled: ENV.IS_DEVELOPMENT,
    level: 'info',
    transport: {
      target: 'pino-pretty'
    }
  }
})

// console.log("[app] ", process.env);

app.get(
  '/health',
  {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  },
  (req, res) => {
    console.log('kk');
    return {
      message: 'Server is running'
    }
  }
)

export { app }
