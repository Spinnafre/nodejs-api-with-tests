export class AlreadyExistsError extends Error {
    public readonly name = 'AlreadyExistsError'

    constructor(prop: string) {
        super(`The property ${prop} already exists.`)
    }
}