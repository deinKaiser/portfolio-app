import { Portfolio } from "src/portfolio/portfolio.model";
import { User } from "src/user/user.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['filename'])
export class Image {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    description: string;

    @Column("text", { array: true, default: '{}' })
    coments: string[];

    @Column()
    created_at: Date;

    @Column()
    filename: string;
    
    @ManyToOne(() => Portfolio, portfolio => portfolio.images)
    portfolio: Portfolio;
    
}

