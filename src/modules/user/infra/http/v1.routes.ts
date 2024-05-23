import { adaptRoute } from '@/main/http/adapters/fastify-route-adapter'
import { FastifyInstance } from 'fastify'
import { createUserController } from '../../presentation/controllers/create-user'

export default async (fastify: FastifyInstance) => {
    fastify.get('/user', async (req, res) => 'hello')

    fastify.post('/user', adaptRoute(createUserController))

    fastify.put('/user', adaptRoute(createUserController))
}