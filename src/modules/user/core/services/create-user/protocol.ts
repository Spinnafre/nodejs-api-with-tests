import { Either } from "@/shared/core/Either";
import { BaseUserDTO } from "../models/baseUser";
import { InvalidUserNameError } from "../../domain/errors/invalid-user-name";
import { InvalidUserEmailError } from "../../domain/errors/invalid-user-email";

export namespace CreateUserUseCaseProtocol {
    export type Input = Omit<BaseUserDTO,'id'>
    export type Output = Either<InvalidUserNameError | InvalidUserEmailError,  ReturnType<<T extends Pick<BaseUserDTO, 'id'>>() => NonNullable<T['id']>>>
    export interface IUseCase {
        perform(data: Input): Promise<Output>
    }
}