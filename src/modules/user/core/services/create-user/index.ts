import { UserRepository } from "@/modules/user/infra/database/repository/implementation/user-repository";
import { CreateUser } from "./create-user";

export const createUserUseCase = new CreateUser(new UserRepository())



