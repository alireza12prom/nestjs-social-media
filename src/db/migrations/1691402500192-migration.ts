import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1691402500192 implements MigrationInterface {
    name = 'Migration1691402500192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "postId" uuid NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_b6e9936dde403ddf87687f1b941"`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "publisherId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_e2fe567ad8d305fefc918d44f50" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_b6e9936dde403ddf87687f1b941" FOREIGN KEY ("publisherId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_b6e9936dde403ddf87687f1b941"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_e2fe567ad8d305fefc918d44f50"`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "publisherId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_b6e9936dde403ddf87687f1b941" FOREIGN KEY ("publisherId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "likes"`);
    }

}
