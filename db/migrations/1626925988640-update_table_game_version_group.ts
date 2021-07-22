import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTableGameVersionGroup1626925988640 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("UPDATE `game_version_groups` SET `is_supported` = 0 WHERE `id` = 14", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("UPDATE `game_version_groups` SET `is_supported` = 1 WHERE `id` = 14", undefined);
    }

}
