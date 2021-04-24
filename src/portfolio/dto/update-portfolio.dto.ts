import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class UpdatePortfolioDto {
    @ApiProperty({example: 'my first portfolio', description: 'Name'})
    @IsString({message: 'Should be a string'})
    @Length(3, 50, {message: 'Should be at least 3 chars and less than 21'})
    readonly name: string;

    @ApiProperty({example: 'descr of my first portfolio', description: 'Name'})
    @IsString({message: 'Should be a string'})
    @Length(0, 400, {message: 'Should be less than 400 symbols'})
    readonly description: string;
} 