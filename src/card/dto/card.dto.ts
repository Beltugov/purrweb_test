import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class CreateCardDto {
    @ApiProperty({ description: 'Card title', example: 'CardTitle' })
    @IsNotEmpty({message: "Empty request"})
    @IsString({message: "Must be a string"})
    readonly title: string;

    @ApiProperty({ description: 'Card description', example: 'Some description' })
    @IsNotEmpty({message: "Empty request"})
    @IsString({message: "Must be a string"})
    readonly description: string;
}