import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/user.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    @ApiOperation({summary: 'User login'})
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    @ApiOperation({summary: 'User registration'})
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}