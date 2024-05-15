export class User {
    private readonly _firstname: string;
    private readonly _lastname: string;

    private constructor(firstname: string, lastname: string) {
        this._firstname = firstname
        this._lastname = lastname
    }

    static create() {

    }

}