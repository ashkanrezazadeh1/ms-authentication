import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742685033242 implements MigrationInterface {
    name = 'Migration1742685033242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "identity" ADD "last_login" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "identity" DROP COLUMN "last_login"`);
    }

}
