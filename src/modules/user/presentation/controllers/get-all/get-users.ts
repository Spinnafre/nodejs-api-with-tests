import { GetAllUsersUseCaseProtocol } from "@/modules/user/core/services/get-all/protocol";
import { WebController } from "@/shared/presentation/protocols/http-controller";

export class GetUsersController implements WebController.IController {
    constructor(
        private readonly _getUser: GetAllUsersUseCaseProtocol.IUseCase
    ) { }

    async handle(): Promise<WebController.IOutput> {
        try {
            const responseOrError = await this._getUser.perform()

            if (responseOrError.isSuccess()) {
                return WebController.ok(responseOrError.value)
            }

            return WebController.badRequest(responseOrError.value)

        } catch (error) {
            return WebController.serverError()
        }
    }
}