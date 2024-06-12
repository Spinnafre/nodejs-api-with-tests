import { describe, beforeAll, test, afterAll, expect } from '@jest/globals';
import { closeServer, startServer } from '../../../src/main/http/helpers/server';
import { DbHelper } from '../../../src/shared/infra/database/helper';
import { UserPropsBuilder } from '../../builder/user';

describe("POST /user", () => {
    let serverAddress: string;

    beforeAll(async () => {
        serverAddress = await startServer()
    })


    afterAll(async () => {
        // await DbHelper.cleanDatabase(["user"])

        await closeServer()
    })

    test('should return user id when user is created', async () => {

        const { email, name } = UserPropsBuilder.aUser().build()


        const response = await fetch(`${serverAddress}/v1/user`, {
            method: "POST",
            body: JSON.stringify({
                email,
                name
            }),
            headers: { "Content-Type": "application/json" }
        })


        const responseJson = await response.json()

        expect(response.status).toEqual(201);
        expect(responseJson).toHaveProperty("id")
    })
    test('should return a error if email is invalid', async () => {

        const { email, name } = UserPropsBuilder.aUser().withInValidEmail().build()

        const response = await fetch(`${serverAddress}/v1/user`, {
            method: "POST",
            body: JSON.stringify({
                email,
                name
            }),
            headers: { "Content-Type": "application/json" }
        })

        const responseJson = await response.json()

        console.log(responseJson);

        expect(response.status).toEqual(422);
        expect(responseJson).toMatchObject({ error: 'The user email is invalid.' })
    })
    test('should return a error if name is invalid', async () => {

        const { email, name } = UserPropsBuilder.aUser().withInValidName().build()

        const response = await fetch(`${serverAddress}/v1/user`, {
            method: "POST",
            body: JSON.stringify({
                email,
                name
            }),
            headers: { "Content-Type": "application/json" }
        })

        const responseJson = await response.json()

        expect(response.status).toEqual(422);
        expect(responseJson).toMatchObject({ error: "The user name is invalid." })
    })
})