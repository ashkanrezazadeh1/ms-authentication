import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742727289698 implements MigrationInterface {
    name = 'Migration1742727289698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "identity" ALTER COLUMN "last_login" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "identity" ALTER COLUMN "last_login" SET DEFAULT now()`);
    }

}
