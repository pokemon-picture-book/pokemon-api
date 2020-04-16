import {MigrationInterface, QueryRunner} from "typeorm";

export class initializeTable1586959101488 implements MigrationInterface {
    name = 'initializeTable1586959101488'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "types" ("id" SERIAL NOT NULL, "code" character varying(60) NOT NULL, "name" character varying(60) NOT NULL, CONSTRAINT "UQ_0888743b52d75e0435c1da667d0" UNIQUE ("code"), CONSTRAINT "PK_33b81de5358589c738907c3559b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "pokemon_types" ("id" SERIAL NOT NULL, "pokemon_id" integer NOT NULL, "type_id" integer NOT NULL, CONSTRAINT "PK_4d2d359062d5345ac2aa14bd702" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "specs" ("id" SERIAL NOT NULL, "hp" smallint NOT NULL, "attack" smallint NOT NULL, "defense" smallint NOT NULL, "sp_attack" smallint NOT NULL, "sp_defense" smallint NOT NULL, "speed" smallint NOT NULL, "pokemon_id" integer NOT NULL, CONSTRAINT "REL_84944d5cf8043a1b3405e14cf0" UNIQUE ("pokemon_id"), CONSTRAINT "PK_89ffcebad2c7014f98bbfa2e0b3" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "pokemons" ("id" integer NOT NULL, "code" character varying(60) NOT NULL, "name" character varying(60) NOT NULL, "flavor_text" character varying(255), "generation_no" smallint NOT NULL, CONSTRAINT "UQ_e461a209e94074a4ce1c185fb34" UNIQUE ("code"), CONSTRAINT "PK_a3172290413af616d9cfa1fdc9a" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "pngs" ("id" SERIAL NOT NULL, "image_url" character varying NOT NULL, "sprite_url" character varying NOT NULL, "pokemon_id" integer NOT NULL, CONSTRAINT "REL_9f2b6f425d04221067ca6b220c" UNIQUE ("pokemon_id"), CONSTRAINT "PK_9836c66b322a2b255946c8992b9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemon_types" ADD CONSTRAINT "FK_d159dc1249158366905f58b8a6d" FOREIGN KEY ("pokemon_id") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemon_types" ADD CONSTRAINT "FK_38c11b73183551cb8a8b9f522c0" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "specs" ADD CONSTRAINT "FK_84944d5cf8043a1b3405e14cf0c" FOREIGN KEY ("pokemon_id") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "pngs" ADD CONSTRAINT "FK_9f2b6f425d04221067ca6b220c1" FOREIGN KEY ("pokemon_id") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pngs" DROP CONSTRAINT "FK_9f2b6f425d04221067ca6b220c1"`, undefined);
        await queryRunner.query(`ALTER TABLE "specs" DROP CONSTRAINT "FK_84944d5cf8043a1b3405e14cf0c"`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemon_types" DROP CONSTRAINT "FK_38c11b73183551cb8a8b9f522c0"`, undefined);
        await queryRunner.query(`ALTER TABLE "pokemon_types" DROP CONSTRAINT "FK_d159dc1249158366905f58b8a6d"`, undefined);
        await queryRunner.query(`DROP TABLE "pngs"`, undefined);
        await queryRunner.query(`DROP TABLE "pokemons"`, undefined);
        await queryRunner.query(`DROP TABLE "specs"`, undefined);
        await queryRunner.query(`DROP TABLE "pokemon_types"`, undefined);
        await queryRunner.query(`DROP TABLE "types"`, undefined);
    }

}
