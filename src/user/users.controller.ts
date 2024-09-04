import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { ApiOperation, ApiTags} from "@nestjs/swagger";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/user.dto";
import {JwtAuthGuard} from "../auth/guards/jwt.guards";
import {UsersEntity} from "./users.entity";
import {UsersGuard} from "../auth/guards/user.guards";

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Post()
    @ApiOperation({summary: 'User create'})
    async create(@Body() dto: CreateUserDto): Promise<UsersEntity>{
        return await this.userService.create(dto);
    }

    @Get()
    @ApiOperation({summary: 'Get all users'})
    async getAll(): Promise<UsersEntity[]> {
        return await this.userService.findAll()
    }

    @Get('/:userId')
    @ApiOperation({summary: 'Get user by id'})
    async getOne(@Param('userId',  ParseIntPipe) id: string): Promise<UsersEntity> {
        return await  this.userService.findOneById(Number(id))
    }

    @Put('/:userId')
    @ApiOperation({summary: 'Change user by id'})
    @UseGuards(JwtAuthGuard,UsersGuard)
    async update(@Param('userId', ParseIntPipe) id: string, @Body() dto: CreateUserDto): Promise<UsersEntity> {
        return await this.userService.update(Number(id), dto)
    }

    @Delete('/:userId')
    @ApiOperation({summary: 'Delete user by id'})
    @UseGuards(JwtAuthGuard, UsersGuard)
    async delete(@Param('userId',  ParseIntPipe) id: string): Promise<string> {
        return await this.userService.delete(Number(id))
    }
}
