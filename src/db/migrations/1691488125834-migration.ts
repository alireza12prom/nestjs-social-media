import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1691488125834 implements MigrationInterface {
  name = 'Migration1691488125834';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "fullname_vector" tsvector GENERATED ALWAYS AS (to_tsvector('simple', COALESCE(first_name, '') || ' ' || COALESCE(last_name, ''))) STORED NOT NULL`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        'postgres',
        'public',
        'users',
        'GENERATED_COLUMN',
        'fullname_vector',
        "to_tsvector('simple', COALESCE(first_name, '') || ' ' || COALESCE(last_name, ''))",
      ],
    );

    await queryRunner.query(
      `CREATE INDEX GIN_fulltext_user_fullname ON "users" USING GIN(fullname_vector)`,
    );

    await queryRunner.query(
      `CREATE INDEX GIN_fulltext_post_body ON "posts" USING GIN(body_vector)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`,
      ['GENERATED_COLUMN', 'fullname_vector', 'postgres', 'public', 'users'],
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "fullname_vector"`,
    );

    await queryRunner.query(`DROP INDEX GIN_fulltext_user_fullname`);

    await queryRunner.query(`DROP INDEX GIN_fulltext_post_body`);
  }
}
