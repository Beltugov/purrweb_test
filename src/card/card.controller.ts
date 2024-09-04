import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards} from "@nestjs/common";
import {CardService} from "./card.service";
import {CardEntity} from "./card.entity";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/guards/jwt.guards";
import {UsersGuard} from "../auth/guards/user.guards";
import {CreateCardDto} from "./dto/card.dto";

@ApiTags('Cards')
@UseGuards(JwtAuthGuard)
@Controller()
export class CardController {
    constructor(private cardService: CardService) {}

    @Post()
    @ApiOperation({summary: 'Card create'})
    create(@Body() dto: CreateCardDto, @Param('columnId',  ParseIntPipe) columnId: string): Promise<CardEntity>  {
        return this.cardService.create(dto, Number(columnId))
    }

    @Get()
    @ApiOperation({summary: 'Get all column card'})
    getAll(@Param('columnId') columnId: string): Promise<CardEntity[]> {
        return this.cardService.getAll(Number(columnId))
    }

    @Get('/:cardId')
    @ApiOperation({summary: 'Get card by id'})
    getOne( @Param('cardId',  ParseIntPipe) cardId: string,  @Param('columnId',  ParseIntPipe) columnId: string): Promise<CardEntity> {
        return this.cardService.getOne(Number(cardId), Number(columnId))
    }


    @Put('/:cardId')
    @UseGuards(UsersGuard)
    @ApiOperation({summary: 'Change card'})
    change(@Body() dto: CreateCardDto, @Param('cardId',  ParseIntPipe) cardId: string,  @Param('columnId',  ParseIntPipe) columnId: string): Promise<CardEntity> {
        return this.cardService.change(dto, Number(cardId), Number(columnId))
    }


    @Delete('/:cardId')
    @UseGuards(UsersGuard)
    @ApiOperation({summary: 'Delete card'})
    delete(@Param('cardId',  ParseIntPipe) cardId: string,  @Param('columnId',  ParseIntPipe) columnId: string): Promise<string> {
        return this.cardService.delete(Number(cardId), Number(columnId))
    }
}