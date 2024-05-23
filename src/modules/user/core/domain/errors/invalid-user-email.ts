export class InvalidUserEmailError extends Error {
    public readonly name = 'InvalidUserEmailError'

    constructor(cause?: string) {
        super(`The user email is invalid.`)
        this.cause = cause
    }
}