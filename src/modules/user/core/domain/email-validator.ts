import { Either, failure, success } from "@/shared/core/Either"
import { InvalidUserEmailError } from "./errors/invalid-user-email"

export function validateEmail(email: string): Either<InvalidUserEmailError, null> {
    const maxEmailSize = 320
    if (emptyOrTooLarge(email, maxEmailSize) || nonConformant(email)) {
        return failure(new InvalidUserEmailError())
    }

    const [local, domain] = email.split('@')

    const maxLocalSize = 64
    const maxDomainSize = 255

    if (emptyOrTooLarge(local, maxLocalSize) ||
        emptyOrTooLarge(domain, maxDomainSize)) {
        return failure(new InvalidUserEmailError())
    }

    if (somePartIsTooLargeIn(domain)) {
        return failure(new InvalidUserEmailError())
    }

    return success(null)
}

function emptyOrTooLarge(str: string, maxSize: number): boolean {
    return !str || str.length > maxSize ? true : false
}

function nonConformant(email: string): boolean {
    const emailRegex =
        /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    return !emailRegex.test(email)
}

function somePartIsTooLargeIn(domain: string): boolean {
    const maxPartSize = 63
    const domainParts = domain.split('.')
    return domainParts.some(function (part) {
        return part.length > maxPartSize
    })
}