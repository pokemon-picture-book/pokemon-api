import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnToRegions1649595814491 implements MigrationInterface {
    name = 'addColumnToRegions1649595814491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`regions\` ADD \`first_pokemon_id\` mediumint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`regions\` ADD \`last_pokemon_id\` mediumint NOT NULL DEFAULT '0'`);

        await queryRunner.query(`UPDATE \`regions\` SET \`first_pokemon_id\` = 0, \`last_pokemon_id\` = 151 WHERE id = 1`);
        await queryRunner.query(`UPDATE \`regions\` SET \`first_pokemon_id\` = 152, \`last_pokemon_id\` = 251 WHERE id = 2`);
        await queryRunner.query(`UPDATE \`regions\` SET \`first_pokemon_id\` = 252, \`last_pokemon_id\` = 386 WHERE id = 3`);
        await queryRunner.query(`UPDATE \`regions\` SET \`first_pokemon_id\` = 387, \`last_pokemon_id\` = 493 WHERE id = 4`);
        await queryRunner.query(`UPDATE \`regions\` SET \`first_pokemon_id\` = 494, \`last_pokemon_id\` = 649 WHERE id = 5`);
        await queryRunner.query(`UPDATE \`regions\` SET \`first_pokemon_id\` = 650, \`last_pokemon_id\` = 721 WHERE id = 6`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`regions\` DROP COLUMN \`last_pokemon_id\``);
        await queryRunner.query(`ALTER TABLE \`regions\` DROP COLUMN \`first_pokemon_id\``);
    }

}
