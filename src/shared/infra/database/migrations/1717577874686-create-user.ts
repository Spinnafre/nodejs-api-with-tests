import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateUser1717577874686 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    generationStrategy: "uuid",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                    length: '24',
                    isNullable: false,
                },
                {
                    name: "email",
                    type: "varchar",
                    isNullable: false,
                    length: '64',
                    isUnique: true
                }
            ]
        }), true)

        await queryRunner.createIndex(
            "user",
            new TableIndex({
                name: "IDX_USER_NAME",
                columnNames: ["name"],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("user", "IDX_USER_NAME")
        await queryRunner.dropTable('users')
    }

}
