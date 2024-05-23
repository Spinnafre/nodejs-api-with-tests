import { User } from "@/modules/user/core/domain/user";
import { BaseUserDTO } from "@/modules/user/core/services/models/baseUser";


export interface IUserDatabase {
    save(data: User): Promise<string>;
    delete(id: string): Promise<void>;
    getByName(name: string): Promise<User | null>;
    emailAlreadyExists(email: string): Promise<boolean>
    getAll(): Promise<Array<Required<BaseUserDTO>> | null>
}

