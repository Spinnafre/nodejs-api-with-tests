export class Guard {
    static stringIsTooLarge(str: string, maxSize: number): boolean {
        if (Guard.stringIsEmpty(str)) return false

        return str.length > maxSize ? true : false
    }

    static stringIsEmpty(str: string): boolean {
        return !str || str.length === 0 ? true : false
    }
}