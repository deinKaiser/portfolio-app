import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { Portfolio } from './portfolio.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio, User])],
  providers: [PortfolioService],
  controllers: [PortfolioController]
})
export class PortfolioModule {}
