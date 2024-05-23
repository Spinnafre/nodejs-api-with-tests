import { Either, success, failure } from "@/shared/core/Either";
import { Guard } from "@/shared/core/Guard";
import { validateEmail } from './email-validator'
import { InvalidUserNameError } from "./errors/invalid-user-name";
import { InvalidUserEmailError } from "./errors/invalid-user-email";

export type UserProps = {
    id?: string;
    name: string;
    email: string;
}

export class User {
    private readonly _name: string;
    private readonly _email: string;
    private readonly _id: string | undefined;

    private constructor(props: UserProps) {
        this._id = props.id
        this._name = props.name
        this._email = props.email
    }

    get email() {
        return this._email
    }

    get id() {
        return this._id || undefined
    }

    get name() {
        return this._name
    }

    static create(props: UserProps): Either<InvalidUserNameError | InvalidUserEmailError, User> {
        if (Guard.stringIsEmpty(props.name)) {
            return failure(new InvalidUserNameError())
        }

        const emailOrError = validateEmail(props.email)

        if (emailOrError.isFailure()) {
            return failure(emailOrError.value)
        }

        return success(new User(props))
    }

}

