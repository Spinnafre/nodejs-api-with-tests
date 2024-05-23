import { UserRepository } from "@/modules/user/infra/database/repository/implementation/user-repository";
import { GetAllUsers } from "./get-all";

export const getAllUsersUserUseCase = new GetAllUsers(new UserRepository())



