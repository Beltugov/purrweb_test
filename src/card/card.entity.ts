import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ColumnEntity} from "../column/column.entity";
import {CommentEntity} from "../comment/comment.entity";
import {UsersEntity} from "../user/users.entity";

@Entity('cards')
export class CardEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @OneToMany(type => CommentEntity, comment => comment.card,{
        onDelete: "CASCADE",
    })
    @JoinColumn()
    comment: CommentEntity[];

    @ManyToOne(type => ColumnEntity, column => column.card, {
        onDelete: "CASCADE",
    })
    column: ColumnEntity;


}