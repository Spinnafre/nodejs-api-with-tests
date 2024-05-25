import { Logger } from "@/shared/infra/logger/logger";
import { User, UserProps } from "../domain/user";

export class UserMapper {
    public static toDomain(user: any): User | null {
        const userOrError = User.create({
            email: user.email,
            name: user.name,
            id: user.id || undefined
        })

        if (userOrError.isFailure()) {
            Logger.error(userOrError.value.message)
            return null
        }

        return userOrError.value
    }

    public static toPersistency(user: User) {
        const data: UserProps = {
            name: user.name,
            email: user.email
        }

        if (user.id) {
            Object.assign(data, {
                id: user.id
            })
        }

        return data
    }
}