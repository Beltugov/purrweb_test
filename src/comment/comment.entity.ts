import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UsersEntity} from "../user/users.entity";
import {CardEntity} from "../card/card.entity";

@Entity('comments')
export class CommentEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(type => CardEntity, card => card.comment,{
        onDelete: "CASCADE",
    })
    card: CardEntity;

}