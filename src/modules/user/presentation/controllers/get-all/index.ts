
import { getAllUsersUserUseCase } from "@/modules/user/core/services";
import { GetUsersController } from "./get-users";

export const getUsersController = new GetUsersController(getAllUsersUserUseCase)