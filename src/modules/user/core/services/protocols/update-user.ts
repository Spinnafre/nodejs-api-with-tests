import { AlreadyExistsError } from "@/shared/errors";
import { UserData } from "../../ports/models/user-data";


export namespace UpdateUserUseCaseProtocol {
    export type Input = Required<UserData>;
    export type Output = AlreadyExistsError;

    export interface UseCase {
        update(input: Input): Promise<Output>
    }
}