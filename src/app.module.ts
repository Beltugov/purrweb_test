import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from './user/users.module';
import {ConfigModule} from "@nestjs/config";
import {UsersEntity} from "./user/users.entity";
import {CommentEntity} from "./comment/comment.entity";
import {ColumnEntity} from "./column/column.entity";
import {CardEntity} from "./card/card.entity";
import {ColumnModule} from "./column/column.module";
import {CommentModule} from "./comment/comment.module";
import {CardModule} from "./card/card.module";
import {RouterModule} from "@nestjs/core";
import {AuthModule} from "./auth/auth.module";


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env",
            isGlobal:true
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host:  process.env.HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [UsersEntity, CommentEntity, ColumnEntity, CardEntity],
            synchronize: true,
            autoLoadEntities: true,
        }),
        AuthModule,
        UsersModule,
        ColumnModule,
        CommentModule,
        CardModule,
        RouterModule.register([
            {
                path: `/users`,
                children: [
                    {
                        path: ':userId/columns',
                        module: ColumnModule,
                        children: [
                            {
                                path: `:columnId/cards`,
                                module: CardModule,
                                children: [
                                    {
                                        path: `:cardId/comments`,
                                        module: CommentModule
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
