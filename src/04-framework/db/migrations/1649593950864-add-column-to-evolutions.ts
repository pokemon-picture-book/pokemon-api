import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnToEvolutions1649593950864 implements MigrationInterface {
    name = 'addColumnToEvolutions1649593950864';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`evolutions\` DROP FOREIGN KEY \`FK_cddd22965a7f80658820ec4d978\``
        );
        await queryRunner.query(
            `ALTER TABLE \`evolutions\` DROP FOREIGN KEY \`FK_4324d1c62f9130c3188c2496e8d\``
        );
        await queryRunner.query(
            `ALTER TABLE \`evolutions\` CHANGE \`from_id\` \`from_id\` mediumint NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE \`evolutions\` CHANGE \`to_id\` \`to_id\` mediumint NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE \`evolutions\` ADD CONSTRAINT \`FK_cddd22965a7f80658820ec4d978\` FOREIGN KEY (\`from_id\`) REFERENCES \`pokemons\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE \`evolutions\` ADD CONSTRAINT \`FK_4324d1c62f9130c3188c2496e8d\` FOREIGN KEY (\`to_id\`) REFERENCES \`pokemons\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`evolutions\` DROP FOREIGN KEY \`FK_4324d1c62f9130c3188c2496e8d\``
        );
        await queryRunner.query(
            `ALTER TABLE \`evolutions\` DROP FOREIGN KEY \`FK_cddd22965a7f80658820ec4d978\``
        );
        await queryRunner.query(
            `ALTER TABLE \`evolutions\` CHANGE \`to_id\` \`to_id\` mediumint NULL`
        );
        await queryRunner.query(
            `ALTER TABLE \`evolutions\` CHANGE \`from_id\` \`from_id\` mediumint NULL`
        );
        await queryRunner.query(
            `ALTER TABLE \`evolutions\` ADD CONSTRAINT \`FK_4324d1c62f9130c3188c2496e8d\` FOREIGN KEY (\`to_id\`) REFERENCES \`pokemons\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE \`evolutions\` ADD CONSTRAINT \`FK_cddd22965a7f80658820ec4d978\` FOREIGN KEY (\`from_id\`) REFERENCES \`pokemons\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }
}
