import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1619511951695 implements MigrationInterface {
    name = 'InitialMigration1619511951695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "image" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "coments" text array NOT NULL DEFAULT '{}', "created_at" TIMESTAMP NOT NULL, "filename" character varying NOT NULL, "portfolioId" integer, CONSTRAINT "UQ_f3396945b75336a47dc511cffb6" UNIQUE ("filename"), CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "portfolio" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_6936bb92ca4b7cda0ff28794e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_fc51544dbbba949bc7c12e52834" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_9d041c43c782a9135df1388ae16" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_9d041c43c782a9135df1388ae16"`);
        // await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_fc51544dbbba949bc7c12e52834"`);
        // await queryRunner.query(`DROP TABLE "portfolio"`);
        // await queryRunner.query(`DROP TABLE "user"`);
        // await queryRunner.query(`DROP TABLE "image"`);
    }

}
