import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1691468441730 implements MigrationInterface {
    name = 'Migration1691468441730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "connections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "targetId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0a1f844af3122354cbd487a8d03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "connections" ADD CONSTRAINT "FK_c8ee0b9afe383566cbe9243a09f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "connections" ADD CONSTRAINT "FK_4759f13482d259aa7b02c3ebb6c" FOREIGN KEY ("targetId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "connections" DROP CONSTRAINT "FK_4759f13482d259aa7b02c3ebb6c"`);
        await queryRunner.query(`ALTER TABLE "connections" DROP CONSTRAINT "FK_c8ee0b9afe383566cbe9243a09f"`);
        await queryRunner.query(`DROP TABLE "connections"`);
    }

}
