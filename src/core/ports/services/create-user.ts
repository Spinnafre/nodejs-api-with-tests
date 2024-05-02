import { UserModel } from "@/core/model/user"

export interface CreateUser {
    add(data: CreateUser.Input): Promise<CreateUser.Output>
}

export namespace CreateUser {
    export type Input = Omit<UserModel, 'id'>
    export type Output = void
}