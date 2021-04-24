import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationException } from 'src/exceptions/validation.exeption';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repository: Repository<User>){}

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
}
