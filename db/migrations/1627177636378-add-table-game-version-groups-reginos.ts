import {MigrationInterface, QueryRunner} from "typeorm";
import gameVersionGroupRegions = require('../seed/games-regions.json');

export class addTableGameVersionGroupsReginos1627177636378 implements MigrationInterface {
    name = 'addTableGameVersionGroupsReginos1627177636378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `game_version_groups_regions` (`id` mediumint NOT NULL AUTO_INCREMENT, `game_version_group_id` mediumint NULL, `region_id` mediumint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `game_version_groups_regions` ADD CONSTRAINT `FK_cb6a1fa2cda6e7ac1e742d41aad` FOREIGN KEY (`game_version_group_id`) REFERENCES `game_version_groups`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `game_version_groups_regions` ADD CONSTRAINT `FK_218261ac87e0486f200f745260d` FOREIGN KEY (`region_id`) REFERENCES `regions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");

        for (const gameVersionGroupRegion of gameVersionGroupRegions) {
            const { id, gameVersionGroupId, regionId } = gameVersionGroupRegion;
            await queryRunner.query(`INSERT INTO game_version_groups_regions (id, game_version_group_id, region_id) VALUES (${id}, ${gameVersionGroupId}, ${regionId});`, undefined);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `game_version_groups_regions` DROP FOREIGN KEY `FK_218261ac87e0486f200f745260d`");
        await queryRunner.query("ALTER TABLE `game_version_groups_regions` DROP FOREIGN KEY `FK_cb6a1fa2cda6e7ac1e742d41aad`");
        await queryRunner.query("DROP TABLE `game_version_groups_regions`");
    }

}
