import { describe, beforeAll, test, afterAll, expect, beforeEach } from '@jest/globals';
import { closeServer, startServer } from '../../../src/main/http/helpers/server'
import { DbHelper } from '../../../src/shared/infra/database/helper'
import { UserPropsBuilder } from '../../builder/user'

describe("GET /user", () => {
    let serverAddress: string;

    beforeAll(async () => {
        serverAddress = await startServer()
    })

    beforeEach(async () => {
        // await DbHelper.cleanDatabase(["user"])

        const { email, name } = UserPropsBuilder.aUser().build()

        await fetch(`${serverAddress}/v1/user`, {
            method: "POST",
            body: JSON.stringify({
                email,
                name
            }),
            headers: { "Content-Type": "application/json" }
        })
    })

    afterAll(async () => {
        // await DbHelper.cleanDatabase(["user"])
        await closeServer()
    })

    test('should return user id when user is created', async () => {

        const response = await fetch(`${serverAddress}/v1/user`)

        const responseJson = await response.json()

        expect(response.status).toEqual(200);

        expect(responseJson).toHaveLength(1)

        expect(responseJson).toMatchObject([{
            id: expect.any(String),
            email: expect.any(String),
            name: expect.any(String)
        }])
    })
})