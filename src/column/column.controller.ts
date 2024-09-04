import {Body, Controller, Delete, Get, Post, Put, Headers, Param, ParseIntPipe, UseGuards} from "@nestjs/common";
import {ColumnService} from "./column.service";
import {ColumnEntity} from "./column.entity";
import { ApiOperation, ApiTags} from "@nestjs/swagger";

import {CreateColumnDto} from "./dto/column.dto";
import {JwtAuthGuard} from "../auth/guards/jwt.guards";
import {UsersGuard} from "../auth/guards/user.guards";

@ApiTags('Columns')
@UseGuards(JwtAuthGuard)
@Controller()
export class ColumnController {
    constructor(private columnService: ColumnService) {}

    @Post()
    @ApiOperation({summary: 'Column create'})
    create(@Body() dto: CreateColumnDto, @Param('userId',  ParseIntPipe) userId: string): Promise<ColumnEntity>  {
        return this.columnService.create(dto, Number(userId))
    }

    @Get()
    @ApiOperation({summary: 'Get all user columns'})
    getAll(@Param('userId') userId: string): Promise<ColumnEntity[]> {
        return this.columnService.getAll(Number(userId))
    }

    @Get('/:columnId')
    @ApiOperation({summary: 'Get column by id'})
    getOne( @Param('userId',  ParseIntPipe) userId: string,  @Param('columnId',  ParseIntPipe) columnId: string): Promise<ColumnEntity> {
        return this.columnService.getOne(Number(userId), Number(columnId))
    }


    @Put('/:columnId')
    @UseGuards(UsersGuard)
    @ApiOperation({summary: 'Change column'})
    change(@Body() dto: CreateColumnDto, @Param('userId',  ParseIntPipe) userId: string,  @Param('columnId',  ParseIntPipe) columnId: string): Promise<ColumnEntity> {
        return this.columnService.change(dto, Number(userId), Number(columnId))
    }


    @Delete('/:columnId')
    @UseGuards(UsersGuard)
    @ApiOperation({summary: 'Delete column'})
    delete(@Param('userId',  ParseIntPipe) userId: string,  @Param('columnId',  ParseIntPipe) columnId: string): Promise<string> {
        return this.columnService.delete(Number(userId), Number(columnId))
    }
}