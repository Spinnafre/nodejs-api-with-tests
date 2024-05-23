import { AlreadyExistsError } from "../../domain/errors/user-already-exists";
import { BaseUserDTO } from "../models/baseUser";
import { Either } from "@/shared/core/Either";

export namespace UpdateUserUseCaseProtocol {
    export type Input = Required<BaseUserDTO>;
    export type Output = Either<AlreadyExistsError, void>;

    export interface IUseCase {
        perform(input: Input): Promise<Output>
    }
}