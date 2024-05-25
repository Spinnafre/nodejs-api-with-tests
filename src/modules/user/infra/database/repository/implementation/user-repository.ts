import { User, UserProps } from '@/modules/user/core/domain/user';
import { UserMapper } from '@/modules/user/core/mappers/userMap';
import { BaseUserDTO } from '@/modules/user/core/services/models/baseUser';
import { DbHelper } from '@/shared/infra/database/helper';
import { Repository } from 'typeorm';
import { DbUserEntity } from '../../model/User';
import { IUserDatabase } from '../user-repository.protocol';

export class UserRepository implements IUserDatabase {
    private repository: Repository<DbUserEntity>

    constructor() {
        this.repository = DbHelper.getRepository(DbUserEntity)
    }

    async emailAlreadyExists(email: string): Promise<boolean> {
        const result = await this.repository.exists({
            where: {
                email: email
            }
        })

        return result
    }

    async save(data: User): Promise<User | null> {
        const userEntity = this.repository.create({
            name: data.name,
            email: data.email
        })

        const response = await this.repository.save(userEntity)

        return UserMapper.toDomain(response)
    }

    async delete(id: string): Promise<boolean> {
        const response = await this.repository.delete({
            id: id
        })

        return response.affected ? true : false
    }

    async getAll(): Promise<Array<User | null> | null> {
        const users = await this.repository.find()

        if (users.length) {
            return users.map((u) => UserMapper.toDomain(u))
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