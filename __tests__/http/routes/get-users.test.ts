import request from 'supertest'
import { app } from "../../../src/main/http/app"
import { UserRepository } from '../../../src/modules/user/infra/database/repository/implementation/user-repository'
import { DbHelper } from '../../../src/shared/infra/database/helper'
import { UserPropsBuilder } from '../../builder/user'

describe("Create user route", () => {
    beforeAll(async () => {
        await DbHelper.connect()
        await app.ready()
    })

    beforeEach(async () => {
        await DbHelper.cleanDatabase(["user"])

        const userProps = UserPropsBuilder.aUser().build()
        const userRepository = new UserRepository()

        await userRepository.save(userProps)
    })

    afterAll(async () => {
        await DbHelper.cleanDatabase(["user"])
        await DbHelper.disconnect()
        await app.close()
    })

    test('should return user id when user is created', async () => {

        const response = await request(app.server).get("/v1/user")
            .set('Accept', 'application/json')


        expect(response.statusCode).toEqual(200);

        const body = response.body

        expect(body).toHaveLength(1)

        const firstItem = body[0]

        expect(firstItem).toHaveProperty("id")
        expect(firstItem).toHaveProperty("email")
        expect(firstItem).toHaveProperty("name")
    })
})