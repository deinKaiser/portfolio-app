import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Portfolio } from "./portfolio/portfolio.model";
import { User } from "./user/user.model";
import { Image } from "./image/image.model"

export const config: TypeOrmModuleOptions = {
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   username: 'postgres',
   password: 'postgres',
   database: 'portfolio',
   entities: [User, Portfolio, Image], 
   migrations: ['dist/migrations/*{.js}'],
   cli: {
     migrationsDir: 'src/migrations'
   },
   synchronize: true,
   migrationsTableName: "migrations_typeorm",
   migrationsRun: true
 }
