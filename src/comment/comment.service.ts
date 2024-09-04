import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {CommentEntity} from "./comment.entity";
import {CreateCardDto} from "../card/dto/card.dto";
import {CardEntity} from "../card/card.entity";
import {CreateCommentDto} from "./dto/comment.dto";

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(CommentEntity)
        private commentRepository: Repository<CommentEntity>,
        private readonly dataSource: DataSource
    ) {
    }

    async create(dto: CreateCommentDto, cardId: number): Promise<CommentEntity> {
        const card = await this.dataSource.getRepository(CardEntity).findOneBy({id: cardId})
        if (!card) throw new NotFoundException("Card not found")
        return this.commentRepository.create({text: dto.text,  card: card}).save()
    }

    async getAll(cardId: number): Promise<CommentEntity[]> {
        return await this.commentRepository.find({
            where: {
                card: {
                    id: cardId
                }
            }
        })
    }

    async getOne(cardId: number, commentId: number): Promise<CommentEntity> {
        const comment = await this.commentRepository.findOne({
            where: {
                id: commentId,
                card: {
                    id: cardId
                }
            },
        })
        if (!comment) throw new NotFoundException("Comment not found")
        return comment
    }


    async change(dto: CreateCommentDto, cardId, commentId): Promise<CommentEntity> {
        const comment = await this.commentRepository.findOne({
            where: {
                id: commentId,
                card: {
                    id: cardId
                }
            },
        })
        if (!comment) throw new NotFoundException("Comment not found")
        comment.text = dto.text || comment.text
        return await this.commentRepository.save(comment)
    }


    async delete(cardId, commentId): Promise<string> {
        const comment = await this.commentRepository.findOne({
            where: {
                id: commentId,
                card: {
                    id: cardId
                }
            },
        })
        if (!comment) throw new NotFoundException("Comment not found")
        await this.commentRepository.remove(comment)
        return "Comment deleted"
    }
}