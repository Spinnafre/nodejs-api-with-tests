import { Either } from "@/shared/core/Either";
import { User, UserProps } from "../../domain/user";

export namespace GetAllUsersUseCaseProtocol {
    export type Output = Either<Error, Array<UserProps> | null>;

    export interface IUseCase {
        perform(): Promise<Output>
    }
}