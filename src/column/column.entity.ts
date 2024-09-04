import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsersEntity} from "../user/users.entity";
import {CardEntity} from "../card/card.entity";

@Entity('columns')
export class ColumnEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(type => UsersEntity, user => user.column, {
        onDelete: "CASCADE",
    })
    user: UsersEntity;

    @OneToMany(type => CardEntity, card => card.column,{
        onDelete: "CASCADE",
    })
    @JoinColumn()
    card: CardEntity[];
}