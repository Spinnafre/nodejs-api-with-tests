import { User } from '@/modules/user/core/domain/user';
import { UserMapper } from '@/modules/user/core/mappers/userMap';
import { BaseUserDTO } from '@/modules/user/core/services/models/baseUser';
import { AppDataSource } from '@/shared/infra/database/connection';
import { Repository } from 'typeorm';
import { DbUserEntity } from '../../model/User';
import { IUserDatabase } from '../user-repository.protocol';

export class UserRepository implements IUserDatabase {
    private repository: Repository<DbUserEntity>

    constructor() {
        this.repository = AppDataSource.getRepository(DbUserEntity)
    }

    async emailAlreadyExists(email: string): Promise<boolean> {
        const result = await this.repository.exists({
            where: {
                email: email
            }
        })

        return result
    }

    async save(data: User): Promise<string> {
        const userEntity = this.repository.create({
            name: data.name,
            email: data.email
        })

        const response = await this.repository.save(userEntity)

        return response.id
    }

    async delete(id: string): Promise<any> {
        this.repository.delete({
            id: id
        })
    }

    async getAll(): Promise<Array<Required<BaseUserDTO>> | null> {
        const users = await this.repository.find()

        if (users.length) {
            return users.map((u) => ({
                id: u.id,
                email: u.email,
                name: u.name
            }))
        }

        return null
    }

    async getByName(name: string): Promise<User | null> {
        const user = await this.repository.findOne({
            select: {
                id: true,
                name: true,
                email: true
            },
            where: {
                name: name
            }
        })

        if (user) {
            return UserMapper.toDomain(user)
        }

        return user
    }

}