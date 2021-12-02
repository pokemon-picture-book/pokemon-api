/* eslint import/extensions: 0 */
import { BaseEntity, Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import FlavorTextEntryEntity from './FlavorTextEntry.entity';
import GameVersionNameEntity from './GameVersionName.entity';
import GeneraEntity from './Genera.entity';
import PokemonNameEntity from './PokemonName.entity';
import RegionNameEntity from './RegionName.entity';
import TypeNameEntity from './TypeName.entity';

@Entity({ name: 'languages' })
class LanguageEntity extends BaseEntity {
    @PrimaryColumn({
        type: 'mediumint',
    })
    readonly id: number;

    @Column({
        type: 'varchar',
        length: 16,
        insert: true,
        update: false,
    })
    readonly name: string;

    @Column({
        name: 'label_name',
        type: 'varchar',
        length: 16,
        default: '',
        insert: true,
        update: false,
    })
    readonly labelName: string;

    @OneToMany(
        () => FlavorTextEntryEntity,
        (flavorTextEntry) => flavorTextEntry.language
    )
    readonly flavorTextEntries: FlavorTextEntryEntity[];

    @OneToMany(
        () => GameVersionNameEntity,
        (gameVersionName) => gameVersionName.language
    )
    readonly gameVersionNames: GameVersionNameEntity[];

    @OneToMany(() => GeneraEntity, (genera) => genera.language)
    readonly generas: GeneraEntity[];

    @OneToMany(() => PokemonNameEntity, (pokemonName) => pokemonName.language)
    readonly pokemonNames: PokemonNameEntity[];

    @OneToMany(() => RegionNameEntity, (regionName) => regionName.language)
    readonly regionNames: RegionNameEntity[];

    @OneToMany(() => TypeNameEntity, (typeName) => typeName.language)
    readonly typeNames: TypeNameEntity[];

    public refer(): void {
        console.table(this);
    }

    constructor(
        id: number,
        name: string,
        flavorTextEntries: FlavorTextEntryEntity[],
        gameVersionNames: GameVersionNameEntity[],
        generas: GeneraEntity[],
        pokemonNames: PokemonNameEntity[],
        regionNames: RegionNameEntity[],
        typeNames: TypeNameEntity[]
    ) {
        super();
        this.id = id;
        this.name = name;
        this.flavorTextEntries = flavorTextEntries;
        this.gameVersionNames = gameVersionNames;
        this.generas = generas;
        this.pokemonNames = pokemonNames;
        this.regionNames = regionNames;
        this.typeNames = typeNames;
    }
}

export default LanguageEntity;
