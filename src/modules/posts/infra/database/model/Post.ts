import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { DbCategoryEntity } from "./Category";

@Entity({
    name: "post"
})
export class DbPostEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {
        unique: true
    })
    title: string;

    @Column("text")
    text: string;

    @ManyToMany(type => DbCategoryEntity, {
        cascade: true,
    })
    @JoinTable()
    categories: DbCategoryEntity[];

}