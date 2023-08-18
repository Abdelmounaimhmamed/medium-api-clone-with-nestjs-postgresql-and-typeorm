

import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDb1692123164077 implements MigrationInterface {
    name = 'SeedDb1692123164077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `insert into tags (name) values ('react') , ('redux') , ('ansible')`,
        )
    }

    public async down(): Promise<void> {}

}
