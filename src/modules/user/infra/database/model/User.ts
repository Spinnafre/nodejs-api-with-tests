import { DbQuestionEntity } from './../../../../questions/infra/database/models/Question';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { randomUUID } from 'node:crypto'
@Entity({ name: 'user', schema: 'public' })
export class DbUserEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar", {
        length: 24,
        nullable: false
    })
    name: string

    @Column("varchar", {
        nullable: false,
        length: 64,
        unique: true
    })
    email: string

    @OneToMany(() => DbQuestionEntity, (question) => question.user)
    questions: DbQuestionEntity[]

    constructor() {
        if (!this.id) {
            this.id = randomUUID()
        }
    }
}
