import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseException } from 'src/exceptions/database.exception';
import { ForbiddenException } from 'src/exceptions/forbidden.exception';
import { FileService } from 'src/file/file.service';
import { Portfolio } from 'src/portfolio/portfolio.model';
import { PortfolioService } from 'src/portfolio/portfolio.service';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { ImageFeedDto } from './dto/image-feed.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './image.model';

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(Image) private repository: Repository<Image>,
        @InjectRepository(Portfolio) private portfolioRepository: Repository<Portfolio>,  
        private fileService: FileService      
    ){}

    async create(dto: CreateImageDto, imageFile: any, req: any) : Promise<Image>{ 
        try{
            const imageOwner = await this.portfolioRepository.findOne( { where: { id: dto.portfolioId }});
            if(!imageOwner){
                throw new DatabaseException(`Portfolio with id ${dto.portfolioId} does not exist`, HttpStatus.NOT_FOUND)
            }
            if(imageOwner.user.id !== req.user.id){
                throw new ForbiddenException('Not allowed to add images in someone elses portfolios')
            }
            const fileName = await this.fileService.createFile(imageFile);
            const imageData = {
                name: dto.name,
                description: dto.description,
                filename: fileName,
                created_at: new Date()
            }

            const image = await this.repository.create(imageData);
            image.portfolio = imageOwner;

            await this.repository.save(image);

            return image;
        }
        catch(e){
            throw new HttpException(e.message, e.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getImageFeed(): Promise<ImageFeedDto[]>{
        const images = await this.repository.find({order:{created_at: 'DESC'}})
        const feedImages: ImageFeedDto[] = images.map( (image): ImageFeedDto => {return {
            imagePath: `${process.env.HOST}:${process.env.PORT}/${image.filename}`, 
            imageName: image.name,
            description: image.description,
            portfolioName: image.portfolio.name,
            creationDate: image.created_at,
        }})
        return feedImages;
    }

    async updateById(id: number, dto: UpdateImageDto, req: any) {
        try{
            const image = await this.repository.findOne({ where: { id }});
            
            if(!image){
                throw new NotFoundException('Image not found')
            }

            if(image.portfolio.user.id !== req.user.id){
                throw new ForbiddenException('Not allowed to update images in someone elses portfolios')
            }

            return this.repository.save({
                ...image,
                ...dto
            });
        }
        catch(e){
            throw new HttpException(e.message,e.HttpStatus);
        }
    }

    async deleteById(id: number, req: any) {
        try{
            const image = await this.repository.findOne({ where: { id }});
            
            if(!image){
                throw new NotFoundException('Image not found')
            }

            if(image.portfolio.user.id !== req.user.id){
                throw new ForbiddenException('Not allowed to update images in someone elses portfolios')
            }

            return await this.repository.delete({ id: id });
        }
        catch(e){
            throw new HttpException(e.message,e.HttpStatus);
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
            throw new HttpException(e.message,e.HttpStatus);
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
