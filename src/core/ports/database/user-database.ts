import { UserModel } from "@/core/model/user";
import { CreateUser } from "../services/create-user";

export interface IUserDatabase {
    save(data: AddUserDatabase.Input): Promise<AddUserDatabase.Output>;
    delete(id: string): Promise<any>;
    getByName(name: string): Promise<GetByNameDatabase.Output>;
}

export namespace AddUserDatabase {
    export type Input = CreateUser.Input
    export type Output = number
}

export namespace DeleteUserDatabase {
    export type Output = void
}

export namespace GetByNameDatabase {
    export type Output = UserModel
}