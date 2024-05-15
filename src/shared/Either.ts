// 
export type Either<Failure, Success> = Left<Failure, Success> | Right<Failure, Success>

export class Left<Failure, Success> {
    private _value: Failure

    constructor(value: Failure) {
        this._value = value
    }

    public isFailure(): this is Left<Failure, Success> {
        return true
    }
    public isSuccess(): this is Right<Failure, Success> {
        return false
    }
}

export class Right<Failure, Success> {
    private _value: Success

    constructor(value: Success) {
        this._value = value
    }

    public isFailure(): this is Left<Failure, Success> {
        return false
    }
    public isSuccess(): this is Right<Failure, Success> {
        return true
    }
}

export const success = <Failure, Success>(value: Success): Either<Failure, Success> => new Right(value)

export const failure = <Failure, Success>(value: any): Either<Failure, Success> => new Left(value)