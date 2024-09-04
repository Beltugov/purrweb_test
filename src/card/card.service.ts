import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {CardEntity} from "./card.entity";
import {ColumnEntity} from "../column/column.entity";
import {CreateCardDto} from "./dto/card.dto";

@Injectable()
export class CardService {

    constructor(
        @InjectRepository(CardEntity)
        private cardRepository: Repository<CardEntity>,
        private readonly dataSource: DataSource
    ) {}

    async create(dto: CreateCardDto, columnId: number): Promise<CardEntity> {
        const column = await this.dataSource.getRepository(ColumnEntity).findOneBy({id: columnId})
        if (!column) throw new NotFoundException("Column not found")
        return this.cardRepository.create({title: dto.title, description: dto.description, column: column}).save()
    }

    async getAll(columnId: number): Promise<CardEntity[]> {
        return await this.cardRepository.find({
            where: {
                column: {
                    id: columnId
                }
            }
        })
    }

    async getOne(cardId: number, columnId: number): Promise<CardEntity> {
        const card = await this.cardRepository.findOne({
            where: {
                id: cardId,
                column: {
                    id: columnId
                }
            },
        })
        if (!card) throw new NotFoundException("Card not found")
        return card
    }


    async change(dto: CreateCardDto, cardId, columnId): Promise<CardEntity> {
        const card = await this.cardRepository.findOne({
            where: {
                id: cardId,
                column: {
                    id: columnId
                }
            },
        })
        if (!card) throw new NotFoundException("Card not found")
        card.title = dto.title || card.title
        card.description = dto.description || card.description
        return await this.cardRepository.save(card)
    }


    async delete(cardId, columnId): Promise<string> {
        const card = await this.cardRepository.findOne({
            where: {
                id: cardId,
                column: {
                    id: columnId
                }
            },
        })
        if (!card) throw new NotFoundException("Card not found")
        await this.cardRepository.remove(card)
        return "Card deleted"
    }
}