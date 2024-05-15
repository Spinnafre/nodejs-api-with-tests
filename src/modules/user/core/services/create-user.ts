import { CreateUserUseCaseProtocol } from "./protocols/create-user";

export class CreateUserService implements CreateUserUseCaseProtocol.UseCase {
    async add(data: CreateUserUseCaseProtocol.Input): Promise<CreateUserUseCaseProtocol.Output> {
        throw new Error("Method not implemented.");
    }
}