import { IUserDatabase } from '@/modules/user/infra/database/repository/user-repository.protocol';
import { GetAllUsersUseCaseProtocol } from './protocol'
import { success } from '@/shared/core/Either';

export class GetAllUsers implements GetAllUsersUseCaseProtocol.IUseCase {
    constructor(private readonly _userRepository: IUserDatabase) { }
    async perform(): Promise<GetAllUsersUseCaseProtocol.Output> {
        const users = await this._userRepository.getAll()

        return success(users)
    }
}