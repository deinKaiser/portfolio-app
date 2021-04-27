import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Portfolio } from 'src/portfolio/portfolio.model';
import { UserController } from './user.controller';
import { User } from './user.model';

import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User,Portfolio]),forwardRef(() => AuthModule)],
  providers: [UserService],
  controllers: [UserController],
  exports: [
    UserService,
  ]
})
export class UserModule {}
