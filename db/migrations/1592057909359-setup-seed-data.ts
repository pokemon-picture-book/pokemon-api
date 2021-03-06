import {MigrationInterface, QueryRunner} from "typeorm";

import evolutions = require('../seed/evolutions.json');
import flavorTextEntries = require('../seed/flavor-text-entries.json');
import gameVersionGroups = require('../seed/game-version-groups.json');
import gameVersionNames = require('../seed/game-version-names.json');
import gameVersions = require('../seed/game-versions.json');
import generas = require('../seed/generas.json');
import languages = require('../seed/languages.json');
import pokemonEvolutions = require('../seed/pokemon-evolutions.json');
import pokemonGameImages = require('../seed/pokemon-game-images.json');
import pokemonImages = require('../seed/pokemon-images.json');
import pokemonNames = require('../seed/pokemon-names.json');
import pokemonTypes = require('../seed/pokemon-types.json');
import pokemons = require('../seed/pokemons.json');
import regionNames = require('../seed/region-names.json');
import regions = require('../seed/regions.json');
import status = require('../seed/status.json');
import typeNames = require('../seed/type-names.json');
import types = require('../seed/types.json');

export class setupSeedData1592057909359 implements MigrationInterface {

    private readonly E = '`';

    public async up(queryRunner: QueryRunner): Promise<any> {
        for (const region of regions) {
            const { id, name } = region;
            await queryRunner.query(`INSERT INTO regions (id, name) VALUES (${id}, '${name}');`, undefined);
        }

        for (const pokemon of pokemons) {
            const { id, height, weight, order, imageColor, regionId } = pokemon;
            await queryRunner.query(`INSERT INTO pokemons (id, height, weight, ${this.E}order${this.E}, image_color, region_id) VALUES (${id}, ${height}, ${weight}, ${order}, '${imageColor}', ${regionId});`, undefined);
        }

        for (const language of languages) {
            const { id, name } = language;
            await queryRunner.query(`INSERT INTO languages (id, name) VALUES (${id}, '${name}');`, undefined);
        }

        for (const evolution of evolutions) {
            const { id, fromId, toId, trigger, detail1, detail2 } = evolution;
            const detailValue1 = detail1 ? `'${detail1}'` : null;
            const detailValue2 = detail2 ? `'${detail2}'` : null;
            await queryRunner.query(`INSERT INTO evolutions (id, from_id, to_id, ${this.E}trigger${this.E}, detail_1, detail_2) VALUES (${id}, ${fromId}, ${toId}, '${trigger}', ${detailValue1}, ${detailValue2});`, undefined);
        }

        for (const flavorTextEntry of flavorTextEntries) {
            const { pokemonId, languageId, flavorText } = flavorTextEntry;
            await queryRunner.query(`INSERT INTO flavor_text_entries (pokemon_id, language_id, flavor_text) VALUES (${pokemonId}, ${languageId}, '${flavorText}');`, undefined);
        }

        for (const gameVersionGroup of gameVersionGroups) {
            const { id, alias } = gameVersionGroup;
            await queryRunner.query(`INSERT INTO game_version_groups (id, alias) VALUES (${id}, '${alias}');`, undefined);
        }

        for (const gameVersion of gameVersions) {
            const { id, name, gameVersionGroupId } = gameVersion;
            await queryRunner.query(`INSERT INTO game_versions (id, name, game_version_group_id) VALUES (${id}, '${name}', ${gameVersionGroupId});`, undefined);
        }

        for (const gameVersionName of gameVersionNames) {
            const { gameVersionId, name, languageId } = gameVersionName;
            await queryRunner.query(`INSERT INTO game_version_names (game_version_id, name, language_id) VALUES (${gameVersionId}, '${name}', ${languageId});`, undefined);
        }

        for (const genera of generas) {
            const { pokemonId, languageId, genus } = genera;
            await queryRunner.query(`INSERT INTO generas (pokemon_id, language_id, genus) VALUES (${pokemonId}, ${languageId}, '${genus}');`, undefined);
        }

        for (const pokemonEvolution of pokemonEvolutions) {
            const { pokemonId, evolutionId } = pokemonEvolution;
            await queryRunner.query(`INSERT INTO pokemons_evolutions (pokemon_id, evolution_id) VALUES (${pokemonId}, ${evolutionId});`, undefined);
        }

        // TODO JSONファイルが巨大なためうまく読み込めていないみたい？
        for (const pokemonGameImage of pokemonGameImages as []) {
            const { pokemonId, path, gameVersionGroupId } = pokemonGameImage;
            await queryRunner.query(`INSERT INTO pokemon_game_images (pokemon_id, path, game_version_group_id) VALUES (${pokemonId}, '${path}', ${gameVersionGroupId});`, undefined);
        }

        for (const pokemonImage of pokemonImages) {
            const { pokemonId, path } = pokemonImage;
            await queryRunner.query(`INSERT INTO pokemon_images (pokemon_id, path) VALUES (${pokemonId}, '${path}');`, undefined);
        }

        for (const pokemonName of pokemonNames) {
            const { pokemonId, languageId, name } = pokemonName;
            await queryRunner.query(`INSERT INTO pokemon_names (pokemon_id, language_id, name) VALUES (${pokemonId}, ${languageId}, '${name}');`, undefined);
        }

        for (const type of types) {
            const { id, name } = type;
            await queryRunner.query(`INSERT INTO types (id, name) VALUES (${id}, '${name}');`, undefined);
        }

        for (const typeName of typeNames) {
            const { typeId, name, languageId } = typeName;
            await queryRunner.query(`INSERT INTO type_names (type_id, name, language_id) VALUES (${typeId}, '${name}', ${languageId});`, undefined);
        }

        for (const pokemonType of pokemonTypes) {
            const { pokemonId, order, typeId } = pokemonType;
            await queryRunner.query(`INSERT INTO pokemons_types (pokemon_id, ${this.E}order${this.E}, type_id) VALUES (${pokemonId}, ${order}, ${typeId});`, undefined);
        }

        for (const regionName of regionNames) {
            const { regionId, name, languageId } = regionName;
            await queryRunner.query(`INSERT INTO region_names (region_id, name, language_id) VALUES (${regionId}, '${name}', ${languageId});`, undefined);
        }

        for (const s of status) {
            const { pokemonId, hp, attack, defense, specialAttack, specialDefense, speed } = s;
            await queryRunner.query(`INSERT INTO status (pokemon_id, hp, attack, defense, special_attack, special_defense, speed) VALUES (${pokemonId}, ${hp}, ${attack}, ${defense}, ${specialAttack}, ${specialDefense}, ${speed});`, undefined);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `evolutions` DROP FOREIGN KEY `FK_4324d1c62f9130c3188c2496e8d`", undefined);
        await queryRunner.query("ALTER TABLE `evolutions` DROP FOREIGN KEY `FK_cddd22965a7f80658820ec4d978`", undefined);
        await queryRunner.query("ALTER TABLE `pokemons` DROP FOREIGN KEY `FK_1d54b6c3978c1835e8304b24c2e`", undefined);
        await queryRunner.query("ALTER TABLE `status` DROP FOREIGN KEY `FK_4d1f989f61eb155fed3ba50bc21`", undefined);
        await queryRunner.query("ALTER TABLE `pokemon_images` DROP FOREIGN KEY `FK_c53e9f7a2a0ece45b88f2bc793c`", undefined);
        await queryRunner.query("ALTER TABLE `pokemons_evolutions` DROP FOREIGN KEY `FK_ff621de93421f054909b98c9856`", undefined);
        await queryRunner.query("ALTER TABLE `pokemons_evolutions` DROP FOREIGN KEY `FK_af15b2474f4456ea3df817cba90`", undefined);
        await queryRunner.query("ALTER TABLE `flavor_text_entries` DROP FOREIGN KEY `FK_a15c1a837d5293ca38db69abb48`", undefined);
        await queryRunner.query("ALTER TABLE `flavor_text_entries` DROP FOREIGN KEY `FK_01112fa9fc45de525ab30e3e6a9`", undefined);
        await queryRunner.query("ALTER TABLE `type_names` DROP FOREIGN KEY `FK_a064960a667f55e9c00aeb762cb`", undefined);
        await queryRunner.query("ALTER TABLE `type_names` DROP FOREIGN KEY `FK_a63668829767dc006dab6ae4311`", undefined);
        await queryRunner.query("ALTER TABLE `pokemons_types` DROP FOREIGN KEY `FK_5603a33a1614d76f71eb7d64437`", undefined);
        await queryRunner.query("ALTER TABLE `pokemons_types` DROP FOREIGN KEY `FK_b49f984653a63865c27d4d55842`", undefined);
        await queryRunner.query("ALTER TABLE `region_names` DROP FOREIGN KEY `FK_6e6607bf694f5c71e561c75089d`", undefined);
        await queryRunner.query("ALTER TABLE `region_names` DROP FOREIGN KEY `FK_ffa4a85ba1704f4ea0c8ad65823`", undefined);
        await queryRunner.query("ALTER TABLE `pokemon_names` DROP FOREIGN KEY `FK_88a9b55805356c9847c837ca442`", undefined);
        await queryRunner.query("ALTER TABLE `pokemon_names` DROP FOREIGN KEY `FK_77124b43c71d1104587ccce5564`", undefined);
        await queryRunner.query("ALTER TABLE `generas` DROP FOREIGN KEY `FK_5c1c6e7361ed5a4ed59c62832ed`", undefined);
        await queryRunner.query("ALTER TABLE `generas` DROP FOREIGN KEY `FK_0ae39bbdf3020a5bb95fa5d6923`", undefined);
        await queryRunner.query("ALTER TABLE `game_version_names` DROP FOREIGN KEY `FK_1c3fed888a98a78de07ef9316b0`", undefined);
        await queryRunner.query("ALTER TABLE `game_version_names` DROP FOREIGN KEY `FK_2a6dc2940ab98f3143936ce5dbb`", undefined);
        await queryRunner.query("ALTER TABLE `game_versions` DROP FOREIGN KEY `FK_f927e8da9d95461924d878feb60`", undefined);
        await queryRunner.query("ALTER TABLE `pokemon_game_images` DROP FOREIGN KEY `FK_00ce692bda6a73864ab71fb4cdc`", undefined);
        await queryRunner.query("ALTER TABLE `pokemon_game_images` DROP FOREIGN KEY `FK_f36146a82bda2b9ba905796d5c6`", undefined);
        await queryRunner.query("DROP TABLE `evolutions`", undefined);
        await queryRunner.query("DROP TABLE `pokemons`", undefined);
        await queryRunner.query("DROP INDEX `REL_4d1f989f61eb155fed3ba50bc2` ON `status`", undefined);
        await queryRunner.query("DROP TABLE `status`", undefined);
        await queryRunner.query("DROP TABLE `pokemon_images`", undefined);
        await queryRunner.query("DROP TABLE `pokemons_evolutions`", undefined);
        await queryRunner.query("DROP TABLE `flavor_text_entries`", undefined);
        await queryRunner.query("DROP TABLE `languages`", undefined);
        await queryRunner.query("DROP TABLE `type_names`", undefined);
        await queryRunner.query("DROP TABLE `types`", undefined);
        await queryRunner.query("DROP TABLE `pokemons_types`", undefined);
        await queryRunner.query("DROP TABLE `region_names`", undefined);
        await queryRunner.query("DROP TABLE `regions`", undefined);
        await queryRunner.query("DROP TABLE `pokemon_names`", undefined);
        await queryRunner.query("DROP TABLE `generas`", undefined);
        await queryRunner.query("DROP TABLE `game_version_names`", undefined);
        await queryRunner.query("DROP TABLE `game_versions`", undefined);
        await queryRunner.query("DROP TABLE `game_version_groups`", undefined);
        await queryRunner.query("DROP TABLE `pokemon_game_images`", undefined);

        await queryRunner.query("CREATE TABLE `pokemon_game_images` (`id` mediumint NOT NULL AUTO_INCREMENT, `path` text NOT NULL, `pokemon_id` mediumint NULL, `game_version_group_id` mediumint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `game_version_groups` (`id` mediumint NOT NULL, `alias` varchar(16) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `game_versions` (`id` mediumint NOT NULL, `name` varchar(32) NOT NULL, `game_version_group_id` mediumint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `game_version_names` (`id` mediumint NOT NULL AUTO_INCREMENT, `name` varchar(32) NOT NULL, `game_version_id` mediumint NULL, `language_id` mediumint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `generas` (`id` mediumint NOT NULL AUTO_INCREMENT, `genus` text NOT NULL, `pokemon_id` mediumint NULL, `language_id` mediumint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `pokemon_names` (`id` mediumint NOT NULL AUTO_INCREMENT, `name` varchar(32) NOT NULL, `pokemon_id` mediumint NULL, `language_id` mediumint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `regions` (`id` mediumint NOT NULL, `name` varchar(16) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `region_names` (`id` mediumint NOT NULL AUTO_INCREMENT, `name` varchar(32) NOT NULL, `region_id` mediumint NULL, `language_id` mediumint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `pokemons_types` (`id` mediumint NOT NULL AUTO_INCREMENT, `order` smallint NOT NULL DEFAULT 0, `pokemon_id` mediumint NULL, `type_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `types` (`id` int NOT NULL, `name` varchar(64) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `type_names` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(60) NOT NULL, `type_id` int NULL, `language_id` mediumint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `languages` (`id` mediumint NOT NULL, `name` varchar(16) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `flavor_text_entries` (`id` mediumint NOT NULL AUTO_INCREMENT, `flavor_text` text NOT NULL, `pokemon_id` mediumint NULL, `language_id` mediumint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `pokemons_evolutions` (`id` mediumint NOT NULL AUTO_INCREMENT, `pokemon_id` mediumint NULL, `evolution_id` mediumint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `pokemon_images` (`id` mediumint NOT NULL AUTO_INCREMENT, `path` text NOT NULL, `pokemon_id` mediumint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `status` (`id` mediumint NOT NULL AUTO_INCREMENT, `hp` smallint NOT NULL, `attack` smallint NOT NULL, `defense` smallint NOT NULL, `special_attack` smallint NOT NULL, `special_defense` smallint NOT NULL, `speed` smallint NOT NULL, `pokemon_id` mediumint NULL, UNIQUE INDEX `REL_4d1f989f61eb155fed3ba50bc2` (`pokemon_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `pokemons` (`id` mediumint NOT NULL, `height` smallint NOT NULL DEFAULT 0, `weight` smallint NOT NULL DEFAULT 0, `order` mediumint NOT NULL DEFAULT 0, `image_color` varchar(32) NOT NULL, `region_id` mediumint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `evolutions` (`id` mediumint NOT NULL AUTO_INCREMENT, `trigger` varchar(32) NOT NULL, `detail_1` json NULL, `detail_2` json NULL, `from_id` mediumint NULL, `to_id` mediumint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `pokemon_game_images` ADD CONSTRAINT `FK_f36146a82bda2b9ba905796d5c6` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `pokemon_game_images` ADD CONSTRAINT `FK_00ce692bda6a73864ab71fb4cdc` FOREIGN KEY (`game_version_group_id`) REFERENCES `game_version_groups`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `game_versions` ADD CONSTRAINT `FK_f927e8da9d95461924d878feb60` FOREIGN KEY (`game_version_group_id`) REFERENCES `game_version_groups`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `game_version_names` ADD CONSTRAINT `FK_2a6dc2940ab98f3143936ce5dbb` FOREIGN KEY (`game_version_id`) REFERENCES `game_versions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `game_version_names` ADD CONSTRAINT `FK_1c3fed888a98a78de07ef9316b0` FOREIGN KEY (`language_id`) REFERENCES `languages`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `generas` ADD CONSTRAINT `FK_0ae39bbdf3020a5bb95fa5d6923` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `generas` ADD CONSTRAINT `FK_5c1c6e7361ed5a4ed59c62832ed` FOREIGN KEY (`language_id`) REFERENCES `languages`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `pokemon_names` ADD CONSTRAINT `FK_77124b43c71d1104587ccce5564` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `pokemon_names` ADD CONSTRAINT `FK_88a9b55805356c9847c837ca442` FOREIGN KEY (`language_id`) REFERENCES `languages`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `region_names` ADD CONSTRAINT `FK_ffa4a85ba1704f4ea0c8ad65823` FOREIGN KEY (`region_id`) REFERENCES `regions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `region_names` ADD CONSTRAINT `FK_6e6607bf694f5c71e561c75089d` FOREIGN KEY (`language_id`) REFERENCES `languages`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `pokemons_types` ADD CONSTRAINT `FK_b49f984653a63865c27d4d55842` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `pokemons_types` ADD CONSTRAINT `FK_5603a33a1614d76f71eb7d64437` FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `type_names` ADD CONSTRAINT `FK_a63668829767dc006dab6ae4311` FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `type_names` ADD CONSTRAINT `FK_a064960a667f55e9c00aeb762cb` FOREIGN KEY (`language_id`) REFERENCES `languages`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `flavor_text_entries` ADD CONSTRAINT `FK_01112fa9fc45de525ab30e3e6a9` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `flavor_text_entries` ADD CONSTRAINT `FK_a15c1a837d5293ca38db69abb48` FOREIGN KEY (`language_id`) REFERENCES `languages`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `pokemons_evolutions` ADD CONSTRAINT `FK_af15b2474f4456ea3df817cba90` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `pokemons_evolutions` ADD CONSTRAINT `FK_ff621de93421f054909b98c9856` FOREIGN KEY (`evolution_id`) REFERENCES `evolutions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `pokemon_images` ADD CONSTRAINT `FK_c53e9f7a2a0ece45b88f2bc793c` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `status` ADD CONSTRAINT `FK_4d1f989f61eb155fed3ba50bc21` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `pokemons` ADD CONSTRAINT `FK_1d54b6c3978c1835e8304b24c2e` FOREIGN KEY (`region_id`) REFERENCES `regions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `evolutions` ADD CONSTRAINT `FK_cddd22965a7f80658820ec4d978` FOREIGN KEY (`from_id`) REFERENCES `pokemons`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `evolutions` ADD CONSTRAINT `FK_4324d1c62f9130c3188c2496e8d` FOREIGN KEY (`to_id`) REFERENCES `pokemons`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
