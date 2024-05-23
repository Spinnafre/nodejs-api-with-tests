import { IUserDatabase } from '@/modules/user/infra/database/repository/user-repository.protocol';
import { GetAllUsersUseCaseProtocol } from './protocol'

export class GetAllUsers implements GetAllUsersUseCaseProtocol.IUseCase {
    constructor(private readonly _userRepository: IUserDatabase) { }
    async perform(): Promise<GetAllUsersUseCaseProtocol.Output> {
        const data = this._userRepository.getAll()
        throw new Error("Method not implemented.");
    }
}