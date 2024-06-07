import { DbUserEntity } from './../../../../user/infra/database/model/User';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'question', schema: 'public' })
export class DbQuestionEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar", {
        nullable: false
    })
    name: string

    // @Column({
    //     name: "userId",
    //     type: "uuid"
    // })
    // user_id: string

    @ManyToOne(type => DbUserEntity)
    @JoinColumn({ name: "userId" })
    user: DbUserEntity;
}
