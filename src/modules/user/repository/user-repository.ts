import { User } from '../core/domain/user';
import { AddUserDatabase, IUserDatabase } from '../core/ports/database/user-database';


export class UserRepository implements IUserDatabase {
    save(data: AddUserDatabase.Input): Promise<AddUserDatabase.Output> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getByName(name: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

}