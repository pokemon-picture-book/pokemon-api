import {MigrationInterface, QueryRunner} from "typeorm";

import pokemons = require('../seed/data/pokemons.json');
import types = require('../seed/data/types.json');
import pokemonTypes = require('../seed/data/pokemonTypes.json');
import specs = require('../seed/data/specs.json');
import pngs = require('../seed/data/pngs.json');

const escapeSingleQuote = (text: string) => /\'/.test(text) ? text.replace(/\'/g, '\'\'') : text;

export class initializeSeedData1588423973727 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        for (const pokemon of pokemons) {
            const { id, code, name, flavor_text, generation_no } = pokemon;
            await queryRunner.query(`INSERT INTO pokemons (id, code, name, flavor_text, generation_no) VALUES (${id}, '${escapeSingleQuote(code)}', '${name}', '${flavor_text}', ${generation_no});`, undefined);
        }

        for (const type of types) {
            const { id, code, name } = type;
            await queryRunner.query(`INSERT INTO types (id, code, name) VALUES (${id}, '${code}', '${name}');`, undefined);
        }

        for (const pokemonType of pokemonTypes) {
            const { pokemon_id, type_id } = pokemonType;
            await queryRunner.query(`INSERT INTO pokemon_types (pokemon_id, type_id) VALUES ('${pokemon_id}', '${type_id}');`, undefined);
        }

        for (const spec of specs ){
            const { pokemon_id, hp, attack, defense, sp_attack, sp_defense, speed } = spec;
            await queryRunner.query(`INSERT INTO specs (pokemon_id, hp, attack, defense, sp_attack, sp_defense, speed) VALUES (${pokemon_id}, ${hp}, ${attack}, ${defense}, ${sp_attack}, ${sp_defense}, ${speed});`, undefined);
        }

        for (const png of pngs) {
            const { image_url, sprite_url, pokemon_id } = png;
            await queryRunner.query(`INSERT INTO pngs (image_url, sprite_url, pokemon_id) VALUES ('${image_url}', '${sprite_url}', ${pokemon_id});`, undefined);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `pngs` DROP FOREIGN KEY `FK_9f2b6f425d04221067ca6b220c1`", undefined);
        await queryRunner.query("ALTER TABLE `specs` DROP FOREIGN KEY `FK_84944d5cf8043a1b3405e14cf0c`", undefined);
        await queryRunner.query("ALTER TABLE `pokemon_types` DROP FOREIGN KEY `FK_38c11b73183551cb8a8b9f522c0`", undefined);
        await queryRunner.query("ALTER TABLE `pokemon_types` DROP FOREIGN KEY `FK_d159dc1249158366905f58b8a6d`", undefined);
        await queryRunner.query("DROP INDEX `REL_9f2b6f425d04221067ca6b220c` ON `pngs`", undefined);
        await queryRunner.query("DROP TABLE `pngs`", undefined);
        await queryRunner.query("DROP INDEX `IDX_e461a209e94074a4ce1c185fb3` ON `pokemons`", undefined);
        await queryRunner.query("DROP TABLE `pokemons`", undefined);
        await queryRunner.query("DROP INDEX `REL_84944d5cf8043a1b3405e14cf0` ON `specs`", undefined);
        await queryRunner.query("DROP TABLE `specs`", undefined);
        await queryRunner.query("DROP TABLE `pokemon_types`", undefined);
        await queryRunner.query("DROP INDEX `IDX_0888743b52d75e0435c1da667d` ON `types`", undefined);
        await queryRunner.query("DROP TABLE `types`", undefined);

        await queryRunner.query("CREATE TABLE `types` (`id` int NOT NULL AUTO_INCREMENT, `code` varchar(60) NOT NULL, `name` varchar(60) NOT NULL, UNIQUE INDEX `IDX_0888743b52d75e0435c1da667d` (`code`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `pokemon_types` (`id` int NOT NULL AUTO_INCREMENT, `pokemon_id` int NOT NULL, `type_id` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `specs` (`id` int NOT NULL AUTO_INCREMENT, `hp` smallint NOT NULL, `attack` smallint NOT NULL, `defense` smallint NOT NULL, `sp_attack` smallint NOT NULL, `sp_defense` smallint NOT NULL, `speed` smallint NOT NULL, `pokemon_id` int NOT NULL, UNIQUE INDEX `REL_84944d5cf8043a1b3405e14cf0` (`pokemon_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `pokemons` (`id` int NOT NULL, `code` varchar(60) NOT NULL, `name` varchar(60) NOT NULL, `flavor_text` varchar(255) NULL, `generation_no` smallint NOT NULL, UNIQUE INDEX `IDX_e461a209e94074a4ce1c185fb3` (`code`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `pngs` (`id` int NOT NULL AUTO_INCREMENT, `image_url` varchar(255) NOT NULL, `sprite_url` varchar(255) NOT NULL, `pokemon_id` int NOT NULL, UNIQUE INDEX `REL_9f2b6f425d04221067ca6b220c` (`pokemon_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `pokemon_types` ADD CONSTRAINT `FK_d159dc1249158366905f58b8a6d` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `pokemon_types` ADD CONSTRAINT `FK_38c11b73183551cb8a8b9f522c0` FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `specs` ADD CONSTRAINT `FK_84944d5cf8043a1b3405e14cf0c` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `pngs` ADD CONSTRAINT `FK_9f2b6f425d04221067ca6b220c1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
