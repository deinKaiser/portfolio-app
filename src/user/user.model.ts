import { Portfolio } from "../portfolio/portfolio.model";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
@Unique(['email'])
export class User {
    @ApiProperty({example: '1', description: 'ID'})
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty({example: 'user2016', description: 'Username'})
    @Column()
    username: string;

    @ApiProperty({example: 'user2016@lmail.com', description: 'Email'})
    @Column()
    email: string;

    
    @ApiProperty({example: 'QweRty3', description: 'Password'})
    @Column()
    password: string;

    @ApiProperty({example: [], description: 'Users` Portfolios'})
    @OneToMany(() => Portfolio, portfolio => portfolio.user, {
        cascade: true,
        eager: true,
    })
    portfolios: Portfolio[];
}

