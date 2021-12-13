import {MigrationInterface, QueryRunner} from "typeorm";

export class createMultipleIndex1638787221995 implements MigrationInterface {
    name = 'createMultipleIndex1638787221995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`IDX_f36146a82bda2b9ba905796d5c\` ON \`pokemon_game_images\` (\`pokemon_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_00ce692bda6a73864ab71fb4cd\` ON \`pokemon_game_images\` (\`game_version_group_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_edda44ba9c18df4e537378f835\` ON \`pokemon_game_images\` (\`pokemon_id\`, \`game_version_group_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_0ae39bbdf3020a5bb95fa5d692\` ON \`generas\` (\`pokemon_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_5c1c6e7361ed5a4ed59c62832e\` ON \`generas\` (\`language_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_324921b315bad355b1578e8c24\` ON \`generas\` (\`pokemon_id\`, \`language_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_77124b43c71d1104587ccce556\` ON \`pokemon_names\` (\`pokemon_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_88a9b55805356c9847c837ca44\` ON \`pokemon_names\` (\`language_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_30dbd6a6f7bc6f934a5ccd86ac\` ON \`pokemon_names\` (\`pokemon_id\`, \`language_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_a63668829767dc006dab6ae431\` ON \`type_names\` (\`type_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_a064960a667f55e9c00aeb762c\` ON \`type_names\` (\`language_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_06bb3b91cf65e822a522fb0611\` ON \`type_names\` (\`type_id\`, \`language_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_01112fa9fc45de525ab30e3e6a\` ON \`flavor_text_entries\` (\`pokemon_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_a15c1a837d5293ca38db69abb4\` ON \`flavor_text_entries\` (\`language_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_f03812dacf5b481b47fca24857\` ON \`flavor_text_entries\` (\`pokemon_id\`, \`language_id\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_f03812dacf5b481b47fca24857\` ON \`flavor_text_entries\``);
        await queryRunner.query(`DROP INDEX \`IDX_a15c1a837d5293ca38db69abb4\` ON \`flavor_text_entries\``);
        await queryRunner.query(`DROP INDEX \`IDX_01112fa9fc45de525ab30e3e6a\` ON \`flavor_text_entries\``);
        await queryRunner.query(`DROP INDEX \`IDX_06bb3b91cf65e822a522fb0611\` ON \`type_names\``);
        await queryRunner.query(`DROP INDEX \`IDX_a064960a667f55e9c00aeb762c\` ON \`type_names\``);
        await queryRunner.query(`DROP INDEX \`IDX_a63668829767dc006dab6ae431\` ON \`type_names\``);
        await queryRunner.query(`DROP INDEX \`IDX_30dbd6a6f7bc6f934a5ccd86ac\` ON \`pokemon_names\``);
        await queryRunner.query(`DROP INDEX \`IDX_88a9b55805356c9847c837ca44\` ON \`pokemon_names\``);
        await queryRunner.query(`DROP INDEX \`IDX_77124b43c71d1104587ccce556\` ON \`pokemon_names\``);
        await queryRunner.query(`DROP INDEX \`IDX_324921b315bad355b1578e8c24\` ON \`generas\``);
        await queryRunner.query(`DROP INDEX \`IDX_5c1c6e7361ed5a4ed59c62832e\` ON \`generas\``);
        await queryRunner.query(`DROP INDEX \`IDX_0ae39bbdf3020a5bb95fa5d692\` ON \`generas\``);
        await queryRunner.query(`DROP INDEX \`IDX_edda44ba9c18df4e537378f835\` ON \`pokemon_game_images\``);
        await queryRunner.query(`DROP INDEX \`IDX_00ce692bda6a73864ab71fb4cd\` ON \`pokemon_game_images\``);
        await queryRunner.query(`DROP INDEX \`IDX_f36146a82bda2b9ba905796d5c\` ON \`pokemon_game_images\``);
    }

}
