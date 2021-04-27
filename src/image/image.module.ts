import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { Image } from './image.model'
import { Portfolio } from 'src/portfolio/portfolio.model';
import { FileModule } from 'src/file/file.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image,Portfolio]), FileModule, AuthModule],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
