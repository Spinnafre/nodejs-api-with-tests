import { DataSource } from "typeorm"
import { User } from "./models/User"
import { ENV } from "@/config/env"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    username: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
