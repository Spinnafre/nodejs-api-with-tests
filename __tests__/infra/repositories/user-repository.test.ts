import { DbHelper } from '../../../src/shared/infra/database/helper';
import { User, UserProps } from './../../../src/modules/user/core/domain/user';
import { UserRepository } from './../../../src/modules/user/infra/database/repository/implementation/user-repository';
import { IUserDatabase } from "../../../src/modules/user/infra/database/repository/user-repository.protocol";
import { UserPropsBuilder } from "../../builder/user";

describe("User Repository", () => {
    let userRepository: IUserDatabase

    beforeEach(async () => {
        await DbHelper.cleanDatabase(["user"])
    })

    beforeAll(async () => {
        await DbHelper.connect()
        userRepository = new UserRepository()
    })

    afterAll(async () => {
        await DbHelper.cleanDatabase(["user"])
        await DbHelper.disconnect()
    })

    test("Should save a user and return the user ID", async () => {

        const userProps = UserPropsBuilder.aUser().build()

        const response = await userRepository.save(userProps)

        expect(response).toBeDefined()
        expect(response?.id).toBeDefined()
    })

    test("Should find all users", async () => {
        const userProps = UserPropsBuilder.aUser().build()

        await userRepository.save(userProps)

        const response = await userRepository.getAll()

        expect(response).not.toBeNull()

        expect(response).toHaveLength(1)

        const user = response![0] as UserProps

        expect(user).toMatchObject(userProps)

    })

    test("Should find a user by name", async () => {
        const userProps = UserPropsBuilder.aUser().build()

        const createUserResponse = await userRepository.save(userProps)

        const user = await userRepository.getByName(userProps.name)

        expect(user).not.toBeNull()

        expect(user).toStrictEqual((createUserResponse as User))

    })

    test("Should remove a user", async () => {
        const userProps = UserPropsBuilder.aUser().build()

        const createUserResponse = await userRepository.save(userProps)

        const isDeleted = await userRepository.delete((createUserResponse as User).id as string)

        expect(isDeleted).toBeTruthy()
    })

    test("Should return true when check previously recorded email", async () => {
        const userProps = UserPropsBuilder.aUser().build()

        await userRepository.save(userProps)

        const alreadyExists = await userRepository.emailAlreadyExists(userProps.email)

        expect(alreadyExists).toBeTruthy()
    })
})