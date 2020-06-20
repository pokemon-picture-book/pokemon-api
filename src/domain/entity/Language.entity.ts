/* eslint import/extensions: 0 */
import { BaseEntity, Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import FlavorTextEntry from './FlavorTextEntry.entity';
import GameVersionName from './GameVersionName.entity';
import Genera from './Genera.entity';
import PokemonName from './PokemonName.entity';
import RegionName from './RegionName.entity';
import TypeName from './TypeName.entity';

@Entity({ name: 'languages' })
class Language extends BaseEntity {
    @PrimaryColumn({
        type: 'mediumint'
    })
    readonly id: number;

    @Column({
        type: 'varchar',
        length: 16,
        insert: true,
        update: false
    })
    readonly name: string;

    @OneToMany(
        () => FlavorTextEntry,
        flavorTextEntry => flavorTextEntry.language
    )
    readonly flavorTextEntries: FlavorTextEntry[];

    @OneToMany(
        () => GameVersionName,
        gameVersionName => gameVersionName.language
    )
    readonly gameVersionNames: GameVersionName[];

    @OneToMany(
        () => Genera,
        genera => genera.language
    )
    readonly generas: Genera[];

    @OneToMany(
        () => PokemonName,
        pokemonName => pokemonName.language
    )
    readonly pokemonNames: PokemonName[];

    @OneToMany(
        () => RegionName,
        regionName => regionName.language
    )
    readonly regionNames: RegionName[];

    @OneToMany(
        () => TypeName,
        typeName => typeName.language
    )
    readonly typeNames: TypeName[];

    public refer(): void {
        console.table(this);
    }
}

export default Language;
