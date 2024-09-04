import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class CreateUserDto {
    @ApiProperty({ description: 'User email', example: 'User@mail.com' })
    @IsNotEmpty({message: "Empty request"})
    @IsString({message: "Must be a string"})
    @IsEmail()
    readonly email: string;

    @ApiProperty({ description: 'User password', example: 'MyPassword123' })
    @IsString({message: "Must be a string"})
    @MinLength(8,{message:"Minimum password length is 8"})
    @MaxLength(24,{message:"Maximum password length is 24"})
    readonly password: string;
}