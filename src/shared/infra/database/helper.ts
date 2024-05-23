import { ENV } from "@/main/config/env"
import { DbCategoryEntity } from "@/modules/posts/infra/database/model/Category"
import { DbPostEntity } from "@/modules/posts/infra/database/model/Post"
import { DbUserEntity } from "@/modules/user/infra/database/model/User"
import { DataSource } from "typeorm"
import { Logger } from "../logger/logger"

class DatabaseHelper {
    connection: DataSource

    async connect(): Promise<void> {
        this.connection = new DataSource({
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

        await this.connection.initialize()
    }

    async disconnect(): Promise<void> {
        await this.connection.destroy()
    }

    async cleanDatabase(toClean?: Array<string>): Promise<void> {
        try {
            const entities = this.connection.entityMetadatas;

            const tables = toClean ? entities.filter((entity) => toClean.includes(entity.tableName)) : entities

            const tableNames = tables.map((entity) => `"${entity.tableName}"`).join(", ");

            await this.connection.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`);

            Logger.info(`[${ENV.DB_NAME} DATABASE]: Clean`);

        } catch (error) {
            throw new Error(`ERROR: Cleaning ${ENV.DB_NAME} database: ${error}`);
        }
    }

}

const DbHelper = new DatabaseHelper()

export {
    DbHelper
}