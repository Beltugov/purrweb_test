import {forwardRef, Module} from "@nestjs/common";
import {UsersModule} from "../user/users.module";
import {JwtModule} from "@nestjs/jwt";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {ConfigModule} from "@nestjs/config";
import {JwtStrategy} from "./jwt/jwt.strategy";


@Module({
    controllers: [AuthController],
    imports: [ forwardRef(() => UsersModule),
        ConfigModule.forRoot(),
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: {
                expiresIn: '24h'
            }
        }),
    ],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {
}

