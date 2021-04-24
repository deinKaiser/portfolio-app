import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { UserModule } from './user/user.module';
import { ImageModule } from './image/image.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import * as path from 'path';
import {config} from './ormconfig';


@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ConfigModule.forRoot({
        envFilePath: `.env`
    }),
    ServeStaticModule.forRoot({
        rootPath: path.resolve( __dirname, 'static'),
    }),
    ImageModule,
    PortfolioModule,
    UserModule
  ],
  
})
export class AppModule {}
