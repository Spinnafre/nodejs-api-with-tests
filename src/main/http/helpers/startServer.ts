import { FastifyInstance } from 'fastify'
import { ENV } from '../../config/env'
import { AppDataSource } from '@/shared/infra/database/connection'

export const startHTTPServer = async (app: FastifyInstance, dbConnection?: Promise<any>) => {
  //   const connection = await dbConnection()
  app.log.info({ actor: 'Database' }, 'Connected 🚀')

  await AppDataSource.initialize();

  const address = await app.listen({
    host: ENV.HTTP_HOST,
    port: ENV.HTTP_PORT,
  })

  app.log.info(`Server is running in ${address}`)

  return address
}
