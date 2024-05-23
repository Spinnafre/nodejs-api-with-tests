import { FastifyRequest, FastifyReply } from 'fastify'
import { WebController } from "@/shared/presentation/protocols/http-controller"
import { Logger } from '@/shared/infra/logger/logger'

export const adaptRoute = <Request extends FastifyRequest & { userId?: string }, Response extends FastifyReply>(controller: WebController.IController) => {
    return async (req: Request, res: Response) => {
        const request = {
            ...(req.body || {}),
            ...(req.params || {}),
            ...(req.query || {})
        }

        Logger.info(`Request IP : ${req.ip}`)

        if (req.userId) {
            Object.assign(request, {
                userId: req.userId
            })
        }

        const httpResponse = await controller.handle(request)

        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            res.status(httpResponse.statusCode).send(httpResponse.body)
        } else {
            Logger.error(httpResponse.body.message)

            res.status(httpResponse.statusCode).send({
                error: httpResponse.body.message
            })
        }
    }
}
