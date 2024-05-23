export class AlreadyExistsError extends Error {
    public readonly name = 'AlreadyExistsError'

    constructor() {
        super(`The user already exists`)
    }
}