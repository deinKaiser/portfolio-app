import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Portfolio } from 'src/portfolio/portfolio.model';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor (private service: UserService) {}
    
    // @Post()
    // @ApiOperation({summary: 'Creates user'})
    // @ApiResponse({status: 200, type: User})
    // @UsePipes(ValidationPipe)
    // async create(@Body() dto: CreateUserDto) {
    //     return await this.service.create(dto);
    // }

    @Get('all')
    @ApiOperation({summary: 'Gets all users'})
    @ApiResponse({status: 200, type: [User] })
    getAll() {
        return this.service.getAll();
    }

    @Delete()
    @ApiOperation({summary: 'Removes portfolio by id'})
    @ApiResponse({status: 200 })
    @UseGuards(JwtAuthGuard)
    remove(@Req() req) {
        return this.service.delete(req);
    }

    @Get(':id/portfolios')
    @ApiOperation({summary: 'Gets all portfolios of user by id'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    getPortfoliosById( @Param('id') id: string) {
        return this.service.getPortfoliosById(+id);
    }
 }
