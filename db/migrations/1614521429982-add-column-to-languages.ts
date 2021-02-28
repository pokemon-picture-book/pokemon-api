import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnToLanguages1614521429982 implements MigrationInterface {
    name = 'addColumnToLanguages1614521429982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `languages` ADD `label_name` varchar(16) NOT NULL DEFAULT ''");
        await queryRunner.query("UPDATE `languages` SET `label_name`='日本語' WHERE `id`=1");
        await queryRunner.query("UPDATE `languages` SET `label_name`='English' WHERE `id`=2");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `languages` DROP COLUMN `label_name`");
    }

}
