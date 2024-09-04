import {ConflictException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UsersEntity} from "./users.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/user.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UsersEntity)
        private userRepository: Repository<UsersEntity>
    ) {}

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 5);
    }

    private async checkConflict (email) {
        const conflict = await this.userRepository.findOneBy({email});
        if (conflict) throw new ConflictException('Email already used');
    }

    public async create(dto: CreateUserDto): Promise<UsersEntity> {
        await this.checkConflict(dto.email)
        const hashPassword = await this.hashPassword(dto.password)
        return await this.userRepository.create({email: dto.email, password: hashPassword}).save()
    }

    public async findAll(): Promise<UsersEntity[]> {
        return await this.userRepository.find()
    }

    public async findOneById(id: number): Promise<UsersEntity> {
        const user = await this.userRepository.findOneBy({id})
        if (!user) throw new NotFoundException('User not found')
        return user
    }

    public async findOneByEmail(email: string): Promise<UsersEntity> {
        const user = await this.userRepository.findOneBy({email})
        if (!user) throw new NotFoundException('User not found')
        return user
    }

    public async update(id: number, dto: CreateUserDto): Promise<UsersEntity> {
        await this.checkConflict(dto.email)
        const user = await this.findOneById(id)
        user.email = dto.email || user.email
        user.password = await this.hashPassword(dto.password) || user.password
        return await this.userRepository.save(user)
    }

    public async delete(id: number): Promise<string> {
        const user = await this.findOneById(id)
        if (!user) throw new NotFoundException()
        await this.userRepository.remove(user);
        return "User deleted"
    }
}
