import { User, UserProps } from "@/modules/user/core/domain/user";

export interface IUserDatabase {
    save(data: UserProps): Promise<User | null>;
    delete(id: string): Promise<boolean>;
    getByName(name: string): Promise<User | null>;
    emailAlreadyExists(email: string): Promise<boolean>
    getAll(): Promise<Array<UserProps> | null>
}
