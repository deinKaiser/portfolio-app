import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { Portfolio } from './portfolio.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { AuthModule } from 'src/auth/auth.module';
import { ImageModule } from 'src/image/image.module';
import { Image } from 'src/image/image.model';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio, User, Image]),AuthModule],
  providers: [PortfolioService],
  controllers: [PortfolioController]
})
export class PortfolioModule {}
