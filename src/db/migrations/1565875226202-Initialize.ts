import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1565875226202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "gif_urls" ("id" SERIAL NOT NULL, "url" character varying, "pokemonId" integer NOT NULL, CONSTRAINT "PK_a357f31c2d73ac690fdb6119b5d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pokemons" ("id" integer NOT NULL, "code" character varying(60), "name" character varying(60), CONSTRAINT "UQ_e461a209e94074a4ce1c185fb34" UNIQUE ("code"), CONSTRAINT "PK_a3172290413af616d9cfa1fdc9a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bases" ("id" SERIAL NOT NULL, "hp" integer NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "sp_attack" integer NOT NULL, "sp_defense" integer NOT NULL, "speed" integer NOT NULL, "pokemonId" integer NOT NULL, CONSTRAINT "REL_f0d635f21afcca0c300e32aaa8" UNIQUE ("pokemonId"), CONSTRAINT "PK_0cd1d54c386cc2118a1057a377b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "png_urls" ("id" SERIAL NOT NULL, "image_url" character varying NOT NULL, "sprite_url" character varying NOT NULL, "thumbnail_url" character varying NOT NULL, "pokemonId" integer NOT NULL, CONSTRAINT "REL_d07e813f658f48129f3bdb99b5" UNIQUE ("pokemonId"), CONSTRAINT "PK_c7551a549672207d1e0b952edcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "types" ("id" SERIAL NOT NULL, "code" character varying(60), "name" character varying(60), CONSTRAINT "UQ_0888743b52d75e0435c1da667d0" UNIQUE ("code"), CONSTRAINT "PK_33b81de5358589c738907c3559b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pokemon_types" ("id" SERIAL NOT NULL, "pokemonId" integer NOT NULL, "typeId" integer NOT NULL, CONSTRAINT "PK_4d2d359062d5345ac2aa14bd702" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "gif_urls" ADD CONSTRAINT "FK_19d1d3ede6063c2ffbea2437bce" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bases" ADD CONSTRAINT "FK_f0d635f21afcca0c300e32aaa84" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "png_urls" ADD CONSTRAINT "FK_d07e813f658f48129f3bdb99b5b" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemon_types" ADD CONSTRAINT "FK_62c57fed23292d34c50ef6c3d22" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemon_types" ADD CONSTRAINT "FK_de32efe7cd614b545d5c8db01c1" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pokemon_types" DROP CONSTRAINT "FK_de32efe7cd614b545d5c8db01c1"`);
        await queryRunner.query(`ALTER TABLE "pokemon_types" DROP CONSTRAINT "FK_62c57fed23292d34c50ef6c3d22"`);
        await queryRunner.query(`ALTER TABLE "png_urls" DROP CONSTRAINT "FK_d07e813f658f48129f3bdb99b5b"`);
        await queryRunner.query(`ALTER TABLE "bases" DROP CONSTRAINT "FK_f0d635f21afcca0c300e32aaa84"`);
        await queryRunner.query(`ALTER TABLE "gif_urls" DROP CONSTRAINT "FK_19d1d3ede6063c2ffbea2437bce"`);
        await queryRunner.query(`DROP TABLE "pokemon_types"`);
        await queryRunner.query(`DROP TABLE "types"`);
        await queryRunner.query(`DROP TABLE "png_urls"`);
        await queryRunner.query(`DROP TABLE "bases"`);
        await queryRunner.query(`DROP TABLE "pokemons"`);
        await queryRunner.query(`DROP TABLE "gif_urls"`);
    }

}
