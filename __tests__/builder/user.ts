import { UserProps } from "../../src/modules/user/core/domain/user";

export class UserPropsBuilder {
    private _user: UserProps = {
        name: 'validName',
        email: 'validEmail@gmail.com'
    }

    static aUser(): UserPropsBuilder {
        return new UserPropsBuilder()
    }

    public withInValidName(): this {
        this._user.name = ''
        return this
    }

    public withInValidEmail(): this {
        this._user.email = "invalidEmail"
        return this
    }

    public build(): UserProps {
        return this._user
    }
}