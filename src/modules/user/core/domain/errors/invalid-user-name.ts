export class InvalidUserNameError extends Error {
    public readonly name = 'InvalidUserNameError'

    constructor() {
        super(`The user name is invalid.`)
    }
}