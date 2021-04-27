import { Image } from "src/image/image.model";
import { User } from "src/user/user.model";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Portfolio {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Image, image => image.portfolio, {
        cascade: true,
        //eager: true,
    })
    images: Image[];

    @ManyToOne(() => User, user => user.portfolios, {onDelete: 'CASCADE', eager: true})
    user: User;
}

