import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    
    @ApiProperty({example: 'user2016', description: 'Username'})
    @IsString({message: 'Should be a string'})
    @Length(3, 20, {message: 'Should be at least 3 chars and less than 21'})
    readonly username: string;

    @ApiProperty({example: 'user2016@lmail.com', description: 'Email'})
    @IsString({message: 'Should be a string'})
    @IsEmail({}, {message: "Incorrect email"})
    readonly email: string;

    @ApiProperty({example: 'QweRty3', description: 'Password'})
    @IsString({message: 'Should be a string'})
    @Length(6, 20, {message: 'Should be at least 6 chars and less than 21'})
    readonly password: string;
    
}
