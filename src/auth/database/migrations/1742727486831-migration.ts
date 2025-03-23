import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742727486831 implements MigrationInterface {
    name = 'Migration1742727486831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "identity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(30) NOT NULL, "username" character varying(15) NOT NULL, "password" character varying NOT NULL, "last_login" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "UQ_b1d0a62d2325c62c1536a84024c" UNIQUE ("username"), CONSTRAINT "PK_ff16a44186b286d5e626178f726" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "identity"`);
    }

}
