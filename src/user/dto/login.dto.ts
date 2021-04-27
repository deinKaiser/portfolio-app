import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class LoginDto {
    
    @ApiProperty({example: 'user2016@lmail.com', description: 'Email'})
    @IsString({message: 'Should be a string'})
    @IsEmail({}, {message: "Incorrect email"})
    readonly email: string;

    @ApiProperty({example: 'QweRty3', description: 'Password'})
    @IsString({message: 'Should be a string'})
    @Length(6, 20, {message: 'Should be at least 6 chars and less than 21'})
    readonly password: string;
    
}