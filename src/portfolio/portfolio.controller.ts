import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthUser } from 'src/user/user.decorator';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Portfolio } from './portfolio.model';
import { PortfolioService } from './portfolio.service';

@ApiTags('Portfolio')
@Controller('portfolio')
export class PortfolioController {
    constructor (private service: PortfolioService) {}
    
    @Post()
    @ApiOperation({summary: 'Creates portfolio'})
    @ApiResponse({status: 200, type: Portfolio})
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    async create(@Req() req, @Body() dto: CreatePortfolioDto) {
        return await this.service.create(dto, req);
    }

    @Get('all')
    @ApiOperation({summary: 'Gets all portfolios'})
    @ApiResponse({status: 200, type: [Portfolio] })
    @UseGuards(JwtAuthGuard)
    async getAll() {
        return await this.service.getAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Gets portfolio by id'})
    @ApiResponse({status: 200, type: Portfolio })
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.service.getById(+id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Updates portfolio by id'})
    @ApiResponse({status: 200, type: Portfolio })
    @UseGuards(JwtAuthGuard)
    update(@Req() req, @Param('id') id: string, @Body() dto: UpdatePortfolioDto) {
        return this.service.updateById(+id, dto, req);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Removes portfolio by id'})
    @ApiResponse({status: 200 })
    @UseGuards(JwtAuthGuard)
    remove(@Req() req, @Param('id') id: string) {
        return this.service.deleteById(+id,req);
    }

    @Get(':id/images')
    @ApiOperation({summary: 'Gets all images in portfolio by id'})
    @ApiResponse({status: 200 })
    @UseGuards(JwtAuthGuard)
    getImagesById( @Param('id') id: string) {
        return this.service.getImagesById(+id);
    }

}
