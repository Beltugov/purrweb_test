import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

import {ColumnEntity} from "./column.entity";
import {ColumnService} from "./column.service";
import {ColumnController} from "./column.controller";
import {UsersEntity} from "../user/users.entity";
import {UsersService} from "../user/users.service";
import {JwtService} from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity, ColumnEntity])],
    controllers: [ColumnController],
    providers: [UsersService, ColumnService, JwtService],
})
export class ColumnModule {}