import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742726882750 implements MigrationInterface {
    name = 'Migration1742726882750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "identity" ADD CONSTRAINT "UQ_b1d0a62d2325c62c1536a84024c" UNIQUE ("username")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "identity" DROP CONSTRAINT "UQ_b1d0a62d2325c62c1536a84024c"`);
    }

}
