import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

import {CommentEntity} from "./comment.entity";
import {CommentService} from "./comment.service";
import {CommentController} from "./comment.controller";
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../user/users.service";
import {UsersEntity} from "../user/users.entity";


@Module({
    imports: [TypeOrmModule.forFeature([CommentEntity, UsersEntity])],
    controllers: [ CommentController],
    providers: [CommentService,JwtService, UsersService],
})
export class CommentModule {}
