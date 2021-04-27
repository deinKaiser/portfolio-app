import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { fromEvent } from 'rxjs';
import { DatabaseException } from 'src/exceptions/database.exception';
import { ForbiddenException } from 'src/exceptions/forbidden.exception';
import { ValidationException } from 'src/exceptions/validation.exception';
import { User } from 'src/user/user.model';
import { Repository } from 'typeorm';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Portfolio } from './portfolio.model';
import { Image } from './../image/image.model'
@Injectable()
export class PortfolioService {
    constructor(
        @InjectRepository(Portfolio) private repository: Repository<Portfolio>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Image) private imageRepository: Repository<Image>
    ){}

    async create(dto: CreatePortfolioDto, req: any): Promise<Portfolio> {
    try{
            
            const portfolioOwner = await this.userRepository.findOne( { where: { id: req.user.id }});
            if(!portfolioOwner){
                throw new DatabaseException(`User with id ${req.user.id} does not exist`, HttpStatus.NOT_FOUND)
            }
            const portfolioData = {
                name: dto.name,
                description: dto.description
            }

            const portfolio = await this.repository.create(portfolioData);
            portfolio.user = portfolioOwner;
    

            await this.repository.save(portfolio);

            return portfolio;
        }
        catch(e){
            throw new HttpException(e.message, e.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateById(id: number, dto: UpdatePortfolioDto, req: any) {
        try{

            const portfolio = await this.repository.findOne({ where: { id }});
            
            if(!portfolio){
                throw new NotFoundException('Portfolio not found')
            }

            if(portfolio.user.id !== req.user.id){
                throw new ForbiddenException('Not allowed to update someone elses portfolio')
            }

            return this.repository.save({
                ...portfolio,
                ...dto
            });
        }
        catch(e){
            throw new HttpException(e.message,e.HttpStatus);
        }
    }

    async deleteById(id: number, req: any) {
        try{

            const portfolio = await this.repository.findOne({ where: { id: id }});

            if(portfolio.user.id !== req.user.id){
                throw new ForbiddenException('Not allowed to update someone elses portfolio')
            }

            const deleted = await this.repository.delete({ id: id });
            if(!deleted.affected){
                throw new NotFoundException('Portfolio not found')
            }
            return deleted;
        }
        catch(e){
            throw new HttpException(e.message,e.HttpStatus);
        }
    }

    async getById(id: number): Promise<Portfolio>{
        try{
            const portfolio = await this.repository.findOne( { where: { id: id }});
            if(!portfolio){
                throw new NotFoundException('Portfolio not found')
            }
            return portfolio;
        }
        catch(e){
            throw new HttpException(e.message,e.HttpStatus);
        }
    }

    async getAll(): Promise<Portfolio[]> {
        try{
            return await this.repository.find();
        }
        catch(e){
            throw new DatabaseException('Unexpected database failure', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
    async getImagesById(id: number) {
        try{
            return await this.imageRepository.find({where: {portfolio: {id: id}}});
        }
        catch(e){
            throw new DatabaseException('Unexpected database failure', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
