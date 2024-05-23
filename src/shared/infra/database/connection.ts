import { DataSource } from "typeorm"
import { ENV } from "../../../main/config/env"
import { DbUserEntity } from "@/modules/user/infra/database/model/User"
import { DbCategoryEntity } from "@/modules/posts/infra/database/model/Category"
import { DbPostEntity } from "@/modules/posts/infra/database/model/Post"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    username: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_NAME,
    synchronize: ENV.IS_DEVELOPMENT,
    logging: ENV.IS_DEVELOPMENT === true,
    entities: [DbUserEntity, DbCategoryEntity, DbPostEntity],
    migrations: ["./src/shared/infra/database/migrations/*.{ts,js}"],
    subscribers: [],
})

