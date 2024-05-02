import { UserModel } from "@/core/model/user";
import { AddUserDatabase, IUserDatabase } from "@/core/ports/database/user-database";

export class UserRepository implements IUserDatabase {
    save(data: AddUserDatabase.Input): Promise<AddUserDatabase.Output> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getByName(name: string): Promise<UserModel> {
        throw new Error("Method not implemented.");
    }

}