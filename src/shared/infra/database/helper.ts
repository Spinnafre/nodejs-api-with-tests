import { ENV } from "@/main/config/env"

import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm"
import { Logger } from "../logger/logger"
import { AppDataSource } from "./connection"

class DatabaseHelper {
    public connection: DataSource

    constructor() {
        this.connection = AppDataSource
    }

    async connect(): Promise<void> {

        await this.connection.initialize()


        Logger.info(this.connection.isInitialized ? 'Connected to database' : 'Not connected')
    }

    async disconnect(): Promise<void> {
        await this.connection.destroy()
    }

    getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> {
        return this.connection.getRepository<T>(entity)
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
