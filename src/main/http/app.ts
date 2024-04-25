import fastify from 'fastify'
import { IS_DEVELOPMENT } from './config/server'

const app = fastify({
  logger: {
    enabled: IS_DEVELOPMENT,
    level: 'info',
    transport: {
      target: 'pino-pretty'
    }
  }
})

app.get(
  '/_health',
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
    return {
      message: 'Server is running'
    }
  }
)

export { app }
