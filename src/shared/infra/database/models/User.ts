import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar", {
        length: 100
    })
    firstName: string

    @Column("smallint", {
        nullable: true,
        unsigned: true
    })
    age: number

}
