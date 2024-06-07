import { InvalidUserEmailError } from "@/modules/user/core/domain/errors/invalid-user-email";
import { InvalidUserNameError } from "@/modules/user/core/domain/errors/invalid-user-name";
import { CreateUserUseCaseProtocol } from "@/modules/user/core/services/create-user/protocol";
import { WebController } from "@/shared/presentation/protocols/http-controller";
import { IUpdateUserRequest } from "./protocol";

export class UpdateUserController implements WebController.IController {
    constructor(
        private readonly _createUser: CreateUserUseCaseProtocol.IUseCase
    ) { }

    async handle(request: IUpdateUserRequest): Promise<WebController.IOutput> {
        try {
            const responseOrError = await this._createUser.perform({
                email: request.email,
                name: request.name
            })

            if (responseOrError.isSuccess()) {
                const userId = responseOrError.value
                return WebController.created(userId)
            }

            const error = responseOrError.value

            switch (error.constructor) {
                case InvalidUserNameError || InvalidUserEmailError:
                    return WebController.invalid(error)
                default:
                    return WebController.badRequest(error)
            }

        } catch (error) {
            return WebController.serverError()
        }
    }
}