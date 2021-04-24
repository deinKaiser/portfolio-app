import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    async create(@Body() dto: CreatePortfolioDto) {
        return await this.service.create(dto);
    }

    @Get('all')
    @ApiOperation({summary: 'Gets all portfolios'})
    @ApiResponse({status: 200, type: [Portfolio] })
    async getAll() {
        return await this.service.getAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Gets portfolio by id'})
    @ApiResponse({status: 200, type: Portfolio })
    findOne(@Param('id') id: string) {
        return this.service.getById(+id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Updates portfolio by id'})
    @ApiResponse({status: 200, type: Portfolio })
    update(@Param('id') id: string, @Body() dto: UpdatePortfolioDto) {
        return this.service.updateById(+id, dto);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Removes portfolio by id'})
    @ApiResponse({status: 200 })
    remove(@Param('id') id: string) {
        return this.service.deleteById(+id);
    }
}
