import { IUserDatabase } from '@/modules/user/infra/database/repository/user-repository.protocol';
import { UpdateUserUseCaseProtocol } from './protocol'

export class UpdateUser implements UpdateUserUseCaseProtocol.IUseCase {
    constructor(private readonly _userRepository: IUserDatabase) { }

    async perform(data: UpdateUserUseCaseProtocol.Input): Promise<UpdateUserUseCaseProtocol.Output> {
        throw new Error("Method not implemented.");
    }
}