import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class CreateCommentDto {
    @ApiProperty({ description: 'Comment text', example: 'Some text' })
    @IsNotEmpty({message: "Empty request"})
    @IsString({message: "Must be a string"})
    readonly text: string;
}