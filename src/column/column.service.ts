import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ColumnEntity} from "./column.entity";
import {CreateColumnDto} from "./dto/column.dto";
import {UsersService} from "../user/users.service";

@Injectable()
export class ColumnService {

    constructor(
        @InjectRepository(ColumnEntity)
        private columnRepository: Repository<ColumnEntity>,
        private usersService: UsersService
    ) {
    }

    async create(dto: CreateColumnDto, userId: number): Promise<ColumnEntity> {
        const user = await this.usersService.findOneById(userId)
        return this.columnRepository.create({title: dto.title, user: user}).save()
    }

    async getAll(userId: number): Promise<ColumnEntity[]> {
        return await this.columnRepository.find({
            where: {
                user: {
                    id: userId
                }
            }
        })
    }

    async getOne(userId: number, columnId: number): Promise<ColumnEntity> {
        const column = await this.columnRepository.findOne({
            where: {
                id: columnId,
                user: {
                    id: userId
                }
            },
        })
        if (!column) throw new NotFoundException("Column not found")
        return column
    }


    async change(dto: CreateColumnDto, userId, columnId): Promise<ColumnEntity> {
        const column = await this.columnRepository.findOne({
            where: {
                id: columnId,
                user: {
                    id: userId
                }
            },
        })
        if (!column) throw new NotFoundException("Column not found")
        column.title = dto.title || column.title
        return await this.columnRepository.save(column)
    }


    async delete(userId, columnId): Promise<string> {
        const column = await this.columnRepository.findOne({
            where: {
                id: columnId,
                user: {
                    id: userId
                }
            },
        })
        if (!column) throw new NotFoundException("Column not found")
        await this.columnRepository.remove(column)
        return "Column deleted"
    }
}