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

app.register(import('../../modules/user/infra/http/v1.routes'), {
  prefix: "v1",
})

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
  function (req, res) {

    return {
      message: '✅ Server is running'
    }
  }
)

export { app }
