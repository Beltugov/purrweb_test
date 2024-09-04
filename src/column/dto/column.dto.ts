import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class CreateColumnDto {
    @ApiProperty({ description: 'Column', example: 'ColumnTitle' })
    @IsNotEmpty({message: "Empty request"})
    @IsString({message: "Must be a string"})
    readonly title: string;
}