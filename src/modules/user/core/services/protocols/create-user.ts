import { UserData } from "../../ports/models/user-data"

export namespace CreateUserUseCaseProtocol {
    export type Input = UserData
    export type Output = void

    export interface UseCase {
        add(data: Input): Promise<Output>
    }
}