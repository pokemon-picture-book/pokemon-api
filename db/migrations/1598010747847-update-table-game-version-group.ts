import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTableGameVersionGroup1598010747847 implements MigrationInterface {
    name = 'updateTableGameVersionGroup1598010747847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `game_version_groups` ADD `is_supported` tinyint NOT NULL DEFAULT 1", undefined);
        await queryRunner.query("UPDATE `game_version_groups` SET `is_supported` = 0 WHERE `id` IN (9, 10, 11, 15)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `game_version_groups` DROP COLUMN `is_supported`", undefined);
    }

}
