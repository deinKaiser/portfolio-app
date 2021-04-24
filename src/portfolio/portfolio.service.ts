import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseException } from 'src/exceptions/database.exeption';
import { ValidationException } from 'src/exceptions/validation.exeption';
import { User } from 'src/user/user.model';
import { Repository } from 'typeorm';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Portfolio } from './portfolio.model';

@Injectable()
export class PortfolioService {
    constructor(
        @InjectRepository(Portfolio) private repository: Repository<Portfolio>,
        @InjectRepository(User) private userRepository: Repository<User>
    ){}

    async create(dto: CreatePortfolioDto): Promise<Portfolio> {
        try{
            const portfolioOwner = await this.userRepository.findOne( { where: { id: dto.userId }});
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
            throw new DatabaseException('Unexpected database failure', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateById(id: number, dto: UpdatePortfolioDto) {
        try{
            const portfolio = await this.repository.findOne({ where: { id }});
              
            if(!portfolio){
                throw new NotFoundException('Portfolio not found')
            }

            return this.repository.save({
                ...portfolio,
                ...dto
            });
        }
        catch(e){
            if(e instanceof NotFoundException){
                throw new NotFoundException('Portfolio not found')
            } else {
                throw new DatabaseException('Unexpected database failure', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    async deleteById(id: number) {
        try{
            const deleted = await this.repository.delete({ id: id });
            if(!deleted.affected){
                throw new NotFoundException('Portfolio not found')
            }
            return deleted;
        }
        catch(e){
            if(e instanceof NotFoundException){
                throw new NotFoundException('Portfolio not found')
            } else {
                throw new DatabaseException('Unexpected database failure', HttpStatus.INTERNAL_SERVER_ERROR)
            }
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
            if(e instanceof NotFoundException){
                throw new NotFoundException('Portfolio not found')
            } else {
                throw new DatabaseException('Unexpected database failure', HttpStatus.INTERNAL_SERVER_ERROR)
            }

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
    
}
