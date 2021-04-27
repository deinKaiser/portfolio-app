import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { Image } from './image.model'
import { CreateImageDto } from './dto/create-image.dto'
import { ImageFeedDto } from './dto/image-feed.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateImageDto } from './dto/update-image.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Image')
@Controller('image')
export class ImageController {
    constructor (private service: ImageService) {}

    @Post()
    @ApiOperation({summary: 'Creates image (for this to work, you have to include image (as a .jpg file) in your request)'})
    @ApiResponse({status: 200, type: Image})
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    async create(@Req() req, @Body() dto: CreateImageDto, @UploadedFile() image): Promise<Image> {
        return await this.service.create(dto, image, req);
    }

    @Get('feed')
    @ApiOperation({summary: 'Gets image feed'})
    @ApiResponse({status: 200, type: [ImageFeedDto] })
    async getImageFeed(): Promise<ImageFeedDto[]>{
        return await this.service.getImageFeed();
    }

    @Get('all')
    @ApiOperation({summary: 'Gets all images'})
    @ApiResponse({status: 200, type: [Image] })
    async getAll() {
        return await this.service.getAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Gets image by id'})
    @ApiResponse({status: 200, type: Image })
    findOne(@Param('id') id: string) {
        return this.service.getById(+id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Updates image by id'})
    @ApiResponse({status: 200, type: Image })
    @UseGuards(JwtAuthGuard)
    update(@Req() req, @Param('id') id: string, @Body() dto: UpdateImageDto) {
        return this.service.updateById(+id, dto, req);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Removes image by id'})
    @ApiResponse({status: 200 })
    @UseGuards(JwtAuthGuard)
    remove(@Req() req, @Param('id') id: string) {
        return this.service.deleteById(+id, req);
    }
}


