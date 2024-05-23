import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
    name: "category"
})
export class DbCategoryEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {
        unique: true
    })
    name: string;

}