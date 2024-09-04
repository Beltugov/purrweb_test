import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards} from "@nestjs/common";
import {CommentService} from "./comment.service";
import {CommentEntity} from "./comment.entity";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/guards/jwt.guards";
import {UsersGuard} from "../auth/guards/user.guards";
import {CreateCommentDto} from "./dto/comment.dto";

@ApiTags('Comments')
@UseGuards(JwtAuthGuard)
@Controller()
export class CommentController {
    constructor(private commentService: CommentService) {
    }

    @Post()
    @ApiOperation({summary: 'Comment create'})
    create(@Body() dto: CreateCommentDto, @Param('cardId', ParseIntPipe) cardId: string): Promise<CommentEntity> {
        return this.commentService.create(dto, Number(cardId))
    }

    @Get()
    @ApiOperation({summary: 'Get all comment card'})
    getAll(@Param('cardId') cardId: string): Promise<CommentEntity[]> {
        return this.commentService.getAll(Number(cardId))
    }

    @Get('/:commentId')
    @ApiOperation({summary: 'Get comment by id'})
    getOne(@Param('cardId', ParseIntPipe) cardId: string, @Param('commentId', ParseIntPipe) commentId: string): Promise<CommentEntity> {
        return this.commentService.getOne(Number(cardId), Number(commentId))
    }


    @Put('/:commentId')
    @UseGuards(UsersGuard)
    @ApiOperation({summary: 'Change comment'})
    change(@Body() dto: CreateCommentDto, @Param('cardId', ParseIntPipe) cardId: string, @Param('commentId', ParseIntPipe) commentId: string): Promise<CommentEntity> {
        return this.commentService.change(dto, Number(cardId), Number(commentId))
    }


    @Delete('/:commentId')
    @UseGuards(UsersGuard)
    @ApiOperation({summary: 'Delete comment'})
    delete(@Param('cardId', ParseIntPipe) cardId: string, @Param('commentId', ParseIntPipe) commentId: string): Promise<string> {
        return this.commentService.delete(Number(cardId), Number(commentId))
    }
}