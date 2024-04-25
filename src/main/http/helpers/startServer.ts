import { FastifyInstance } from 'fastify'
import { HTTP_HOST, HTTP_PORT } from '../config/server'

export const startHTTPServer = async (app: FastifyInstance, dbConnection?: Promise<any>) => {
  //   const connection = await dbConnection()
  app.log.info({ actor: 'Mongodb' }, 'Connected 🚀')

  const address = await app.listen({
    host: HTTP_HOST,
    port: HTTP_PORT
  })

  app.log.info(`Server is running in ${address}`)

  return address
}
