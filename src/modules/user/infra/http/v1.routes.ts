import { adaptRoute } from '@/main/http/adapters/fastify-route-adapter'
import { FastifyInstance } from 'fastify'
import { createUserController } from '../../presentation/controllers/create-user'
import { getUsersController } from '../../presentation/controllers/get-all'

export default async (fastify: FastifyInstance) => {
    fastify.get('/user', adaptRoute(getUsersController))

    fastify.post('/user', adaptRoute(createUserController))

    // fastify.put('/user', adaptRoute(createUserController))
}