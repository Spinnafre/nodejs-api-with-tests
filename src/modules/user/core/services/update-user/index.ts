import { UserRepository } from "@/modules/user/infra/database/repository/implementation/user-repository";
import { UpdateUser } from "./update-user";

export const updateUserUseCase = new UpdateUser(new UserRepository())

