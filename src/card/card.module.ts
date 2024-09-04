import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CardService} from "./card.service";
import {CardEntity} from "./card.entity";
import {CardController} from "./card.controller";
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../user/users.service";
import {UsersEntity} from "../user/users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CardEntity, UsersEntity])],
    controllers: [CardController],
    providers: [CardService, JwtService, UsersService],
})
export class CardModule {}