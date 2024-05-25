import { UserProps } from "../../src/modules/user/core/domain/user";

export class UserPropsBuilder {
    private _user: UserProps = {
        name: 'validName',
        email: 'validEmail@gmail.com'
    }

    static aUser(): UserPropsBuilder {
        return new UserPropsBuilder()
    }

    public withInValidName() {
        this._user.email = ''
    }

    public withInValidEmail() {
        this._user.email = "invalidEmail"
    }

    public build(): UserProps {
        return this._user
    }
}