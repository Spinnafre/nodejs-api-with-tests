import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTables1715650865056 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "post",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "title",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "text",
                        type: "text",
                    },
                ],
            }),
            true,
        )

        await queryRunner.createTable(
            new Table({
                name: "category",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "title",
                        type: "varchar",
                        isUnique: true,
                    }
                ],
            }),
            true,
        )
        await queryRunner.createTable(
            new Table({
                name: "post_category",
                columns: [
                    {
                        name: "id_post",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },

                ],
            }),
            true,
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
