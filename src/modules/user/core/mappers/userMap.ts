import { Logger } from "@/shared/infra/logger/logger";
import { User } from "../domain/user";

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
}