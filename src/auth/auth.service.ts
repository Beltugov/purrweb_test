import {ConflictException, Injectable, UnauthorizedException} from "@nestjs/common";
import {UsersService} from "../user/users.service";

import {CreateUserDto} from "../user/dto/user.dto";
import * as bcrypt from "bcryptjs";
import {UsersEntity} from "../user/users.entity";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private  usersService: UsersService,
        private  jwtService: JwtService
    ) {}

    async registration(dto: CreateUserDto): Promise<{token: string}> {
        const user = await this.usersService.create(dto);
        return this.generateToken(user)
    }

    async login(dto: CreateUserDto): Promise<{token: string}> {
        const user = await this.validateUser(dto)
        return this.generateToken(user)
    }

     async generateToken(user: UsersEntity): Promise<{token: string}> {
        return{token: this.jwtService.sign({email: user.email, id: user.id})};
    }

     async validateUser(dto: CreateUserDto) {
        const user = await this.usersService.findOneByEmail(dto.email);
        const passwordEquals = await bcrypt.compare(dto.password, user.password);
        if (!user || !passwordEquals) throw new UnauthorizedException({message: 'Incorrect email or password'})
        return user
    }
}