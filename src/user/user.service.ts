import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseException } from 'src/exceptions/database.exception';
import { ForbiddenException } from 'src/exceptions/forbidden.exception';
import { NotFoundException } from 'src/exceptions/not-found.exception';
import { ValidationException } from 'src/exceptions/validation.exception';
import { Portfolio } from 'src/portfolio/portfolio.model';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';


@Injectable()
export class UserService {   
    constructor(
        @InjectRepository(User) private repository: Repository<User>,
        @InjectRepository(Portfolio) private portfolioRepository: Repository<Portfolio>
    ){}

    async create(dto: CreateUserDto){
        try{
            const user = await this.repository.create(dto);
            await this.repository.save(user);

            return user;
        }
        catch(e){
            if(e instanceof QueryFailedError){
                throw new ValidationException("User with following email already exists", HttpStatus.CONFLICT)
            }
            else{
                throw new ValidationException("Unexpected database failure", HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
        
    }

    getAll(): Promise<User[]> {
        return this.repository.find();
    }

    async getUserByEmail(email: string) {
        return this.repository.findOne({where: {email: email}});
    }

    async delete(req: any) {
        try{            
            return await this.repository.delete({ id: req.user.id });
        }
        catch(e){
            throw new HttpException(e.message,e.HttpStatus)
            
        }
    }
    
    async getPortfoliosById(id: number) {
        try{
            return await this.portfolioRepository.find({where: {user: {id: id}}});
        }
        catch(e){
            throw new DatabaseException('Unexpected database failure', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
