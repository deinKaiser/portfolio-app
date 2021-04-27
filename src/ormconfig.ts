import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Portfolio } from "./portfolio/portfolio.model";
import { User } from "./user/user.model";
import { Image } from "./image/image.model"

export const config: TypeOrmModuleOptions = {
   type: 'postgres',
   host: process.env.POSTGRES_HOST,
   port: Number(process.env.POSTGRESS_PORT),
   username: process.env.POSTGRES_USER,
   password: process.env.POSTGRESS_PASSWORD,
   database: process.env.POSTGRES_DB,
   entities: [User, Portfolio, Image], 
   migrations: ['dist/migrations/*{.js}'],
   cli: {
     migrationsDir: 'src/migrations'
   },
   synchronize: true,
   migrationsTableName: "migrations_typeorm",
   migrationsRun: true
 }
