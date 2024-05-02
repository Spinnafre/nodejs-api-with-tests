import { CreateUser } from "../ports/services/create-user";

export class CreateUserService implements CreateUser {
    async add(data: CreateUser.Input): Promise<void> {
        throw new Error("Method not implemented.");
    }
}