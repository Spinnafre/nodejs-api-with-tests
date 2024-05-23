import { describe, test, beforeEach, afterAll } from "@jest/globals";
import { DbHelper } from '../../../src/shared/infra/database/helper'

describe("User Repository", () => {
    beforeEach(async () => {
        await DbHelper.connect()
    })

    afterAll(async () => {
        await DbHelper.cleanDatabase(["user"])
    })

    test("Should find all users", async () => {

    })

    test.todo("Should save a user")

    test.todo("Should find a user by name")

    test.todo("Should remove a user")

    test.todo("Should return true when check previously recorded email")
})