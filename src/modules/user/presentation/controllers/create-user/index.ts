import { createUserUseCase } from "@/modules/user/core/services";
import { CreateUserController } from "./create-user";

export const createUserController = new CreateUserController(createUserUseCase)