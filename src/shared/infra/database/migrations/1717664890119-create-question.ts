import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex } from "typeorm";

export class CreateQuestions1717664890119 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "question",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        generationStrategy: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                ],
            }),
            true,
        )

        await queryRunner.createIndex(
            "question",
            new TableIndex({
                name: "IDX_QUESTION_NAME",
                columnNames: ["name"],
            }),
        )

        await queryRunner.addColumn(
            "question",
            new TableColumn({
                name: "userId",
                type: "uuid",
            }),
        )

        await queryRunner.createForeignKey(
            "question",
            new TableForeignKey({
                name: "FKQuestionUser",
                columnNames: ["userId"],
                referencedTableName: "user",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            }),
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("question")

        if (table) {
            const foreignKey = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("userId") !== -1,
            )

            foreignKey && await queryRunner.dropForeignKey("question", foreignKey)
        }

        await queryRunner.dropIndex("question", "IDX_QUESTION_NAME")
        await queryRunner.dropTable('question', true)
    }

}
