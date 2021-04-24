import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseException } from 'src/exceptions/database.exeption';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { ImageFeedDto } from './dto/image-feed.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './image.model';

@Injectable()
export class ImageService {
    constructor(@InjectRepository(Image) private repository: Repository<Image>){}

    async create(dto: CreateImageDto, image) : Promise<Image>{ 
        return new Image();
    }

    async getImageFeed(): Promise<ImageFeedDto[]>{
        const images = await this.repository.find({order:{created_at: 'DESC'}})
        const feedImages: ImageFeedDto[] = images.map( (image): ImageFeedDto => {return {
            imagePath: `${process.env.HOST}:${process.env.PORT}/${image.filename}`, 
            imageName: image.name,
            description: image.description,
            portfolioName: image.portfolio.name
        }})
        return feedImages;
    }

    async updateById(id: number, dto: UpdateImageDto) {
        try{
            const image = await this.repository.findOne({ where: { id }});
              
            if(!image){
                throw new NotFoundException('Image not found')
            }

            return this.repository.save({
                ...image,
                ...dto
            });
        }
        catch(e){
            if(e instanceof NotFoundException){
                throw new NotFoundException('Image not found')
            } else {
                throw new DatabaseException('Unexpected database failure', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    async deleteById(id: number) {
        try{
            const deleted = await this.repository.delete({ id: id });
            if(!deleted.affected){
                throw new NotFoundException('Image not found')
            }
            return deleted;
        }
        catch(e){
            if(e instanceof NotFoundException){
                throw new NotFoundException('Image not found')
            } else {
                throw new DatabaseException('Unexpected database failure', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    async getById(id: number): Promise<Image>{
        try{
            const image = await this.repository.findOne( { where: { id: id }});
            if(!image){
                throw new NotFoundException('Image not found')
            }
            return image;
        }
        catch(e){
            if(e instanceof NotFoundException){
                throw new NotFoundException('Image not found')
            } else {
                throw new DatabaseException('Unexpected database failure', HttpStatus.INTERNAL_SERVER_ERROR)
            }

        }
    }

    async getAll(): Promise<Image[]> {
        try{
            return await this.repository.find();
        }
        catch(e){
            throw new DatabaseException('Unexpected database failure', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
}
