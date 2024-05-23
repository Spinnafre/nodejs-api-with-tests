import { Either } from "@/shared/core/Either";
import { BaseUserDTO } from "../models/baseUser";

export namespace GetAllUsersUseCaseProtocol {
    export type Output = Either<Error, Array<Required<BaseUserDTO>> | null>;

    export interface IUseCase {
        perform(): Promise<Output>
    }
}