import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742728518422 implements MigrationInterface {
    name = 'Migration1742728518422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "identity" ALTER COLUMN "last_login" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "identity" ALTER COLUMN "last_login" SET NOT NULL`);
    }

}
