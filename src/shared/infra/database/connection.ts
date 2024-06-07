import { DbQuestionEntity } from './../../../modules/questions/infra/database/models/Question';
import { DbUserEntity } from './../../../modules/user/infra/database/model/User';
import { DataSource } from "typeorm"
import { ENV } from "../../../main/config/env"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    username: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_NAME,
    synchronize: false, // when the value is "true" and running in watch mode it will sync automatically with database
    logging: ENV.IS_DEVELOPMENT === true,
    entities: [DbUserEntity, DbQuestionEntity],
    migrations: ["./src/shared/infra/database/migrations/*.{ts,js}"],
    migrationsTableName: "migrations",
    subscribers: [],
})

