import { IUserDatabase } from "@/modules/user/infra/database/repository/user-repository.protocol";
import { CreateUserUseCaseProtocol } from "./protocol";
import { failure, success } from "@/shared/core/Either";
import { User } from "../../domain/user";

export class CreateUser implements CreateUserUseCaseProtocol.IUseCase {
    constructor(private readonly _userRepository: IUserDatabase) { }

    async perform(data: CreateUserUseCaseProtocol.Input): Promise<CreateUserUseCaseProtocol.Output> {

        const userOrError = User.create({
            name: data.name,
            email: data.email
        })

        if (userOrError.isFailure()) {
            return failure(userOrError.value)
        }

        const user = userOrError.value

        const createdUser = await this._userRepository.save(user)

        return success(createdUser?.id as string)
    }
}