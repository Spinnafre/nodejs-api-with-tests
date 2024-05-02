import { randomUUID } from "crypto"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar", {
        length: 100
    })
    firstName: string

    @Column("varchar", {
        length: 100
    })
    lastName: string

    @Column("smallint", {
        nullable: true,
        unsigned: true
    })
    age: number

    constructor(firstName: string, lastName: string, age: number) {
        this.id = randomUUID()
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
    }

}
