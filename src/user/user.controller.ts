import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor (private service: UserService) {}
    
    @Post()
    @ApiOperation({summary: 'Creates user'})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidationPipe)
    async create(@Body() dto: CreateUserDto) {
        return await this.service.create(dto);
    }

    @Get('all')
    @ApiOperation({summary: 'Gets all users'})
    @ApiResponse({status: 200, type: [User] })
    getAll() {
        return this.service.getAll();
    }
 }
