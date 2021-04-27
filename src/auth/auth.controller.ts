import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/user/dto/login.dto';

import {AuthService} from "./auth.service";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    @UsePipes(ValidationPipe)
    login(@Body() userDto: LoginDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    @UsePipes(ValidationPipe)
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
