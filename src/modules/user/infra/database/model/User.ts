import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "user" })
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

}
