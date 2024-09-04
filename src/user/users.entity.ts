import {BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Table} from "typeorm";
import {ColumnEntity} from "../column/column.entity";
import {CardEntity} from "../card/card.entity";
import {CommentEntity} from "../comment/comment.entity";

@Entity('users')
export class UsersEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @OneToMany(type => ColumnEntity, column => column.user, {
        onDelete: "CASCADE",
    })
    @JoinColumn()
    column: ColumnEntity[];
}