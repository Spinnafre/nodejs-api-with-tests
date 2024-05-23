import { BaseUserDTO } from './../../../src/modules/user/core/services/models/baseUser';
import { User } from './../../../src/modules/user/core/domain/user';
import { IUserDatabase } from './../../../src/modules/user/infra/database/repository/user-repository.protocol';

export class InMemoryUserRepository implements IUserDatabase {
    save(data: User): Promise<string> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getByName(name: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    emailAlreadyExists(email: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    getAll(): Promise<BaseUserDTO[] | null> {
        throw new Error('Method not implemented.');
    }

}