import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Category } from "./Category";

@Entity({
    name: "post"
})
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {
        unique: true
    })
    title: string;

    @Column("text")
    text: string;

    @ManyToMany(type => Category, {
        cascade: true,
    })
    @JoinTable()
    categories: Category[];

}