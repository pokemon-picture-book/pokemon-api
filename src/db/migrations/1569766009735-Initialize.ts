import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1569766009735 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pokemon_types" DROP CONSTRAINT "FK_de32efe7cd614b545d5c8db01c1"`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemon_types" DROP CONSTRAINT "FK_62c57fed23292d34c50ef6c3d22"`, undefined);
        await queryRunner.query(`CREATE TABLE "pngs" ("id" SERIAL NOT NULL, "image_url" character varying NOT NULL, "sprite_url" character varying NOT NULL, "pokemon_id" integer NOT NULL, CONSTRAINT "REL_9f2b6f425d04221067ca6b220c" UNIQUE ("pokemon_id"), CONSTRAINT "PK_9836c66b322a2b255946c8992b9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "specs" ("id" SERIAL NOT NULL, "hp" smallint NOT NULL, "attack" smallint NOT NULL, "defense" smallint NOT NULL, "sp_attack" smallint NOT NULL, "sp_defense" smallint NOT NULL, "speed" smallint NOT NULL, "pokemon_id" integer NOT NULL, CONSTRAINT "REL_84944d5cf8043a1b3405e14cf0" UNIQUE ("pokemon_id"), CONSTRAINT "PK_89ffcebad2c7014f98bbfa2e0b3" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "gifs" ("id" SERIAL NOT NULL, "url" character varying, "pokemon_id" integer NOT NULL, CONSTRAINT "PK_1aa4915fe8d23284838bf8956f7" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemon_types" DROP COLUMN "pokemonId"`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemon_types" DROP COLUMN "typeId"`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemon_types" ADD "pokemon_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemon_types" ADD "type_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "generation_no" smallint`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "detail" character varying(255) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pngs" ADD CONSTRAINT "FK_9f2b6f425d04221067ca6b220c1" FOREIGN KEY ("pokemon_id") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemon_types" ADD CONSTRAINT "FK_d159dc1249158366905f58b8a6d" FOREIGN KEY ("pokemon_id") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemon_types" ADD CONSTRAINT "FK_38c11b73183551cb8a8b9f522c0" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "specs" ADD CONSTRAINT "FK_84944d5cf8043a1b3405e14cf0c" FOREIGN KEY ("pokemon_id") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "gifs" ADD CONSTRAINT "FK_34d8a4a6c6154bb5687fa2d4fcd" FOREIGN KEY ("pokemon_id") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "gifs" DROP CONSTRAINT "FK_34d8a4a6c6154bb5687fa2d4fcd"`, undefined);
        await queryRunner.query(`ALTER TABLE "specs" DROP CONSTRAINT "FK_84944d5cf8043a1b3405e14cf0c"`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemon_types" DROP CONSTRAINT "FK_38c11b73183551cb8a8b9f522c0"`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemon_types" DROP CONSTRAINT "FK_d159dc1249158366905f58b8a6d"`, undefined);
        await queryRunner.query(`ALTER TABLE "pngs" DROP CONSTRAINT "FK_9f2b6f425d04221067ca6b220c1"`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "detail"`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "generation_no"`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemon_types" DROP COLUMN "type_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemon_types" DROP COLUMN "pokemon_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemon_types" ADD "typeId" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemon_types" ADD "pokemonId" integer NOT NULL`, undefined);
        await queryRunner.query(`DROP TABLE "gifs"`, undefined);
        await queryRunner.query(`DROP TABLE "specs"`, undefined);
        await queryRunner.query(`DROP TABLE "pngs"`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemon_types" ADD CONSTRAINT "FK_62c57fed23292d34c50ef6c3d22" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemon_types" ADD CONSTRAINT "FK_de32efe7cd614b545d5c8db01c1" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
