/* eslint import/extensions: 0 */
import { BaseEntity, Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import FlavorTextEntry from './FlavorTextEntry';
import GameVersionName from './GameVersionName';
import Genera from './Genera';
import PokemonName from './PokemonName';
import RegionName from './RegionName';
import TypeName from './TypeName';

@Entity({ name: 'languages' })
class Language extends BaseEntity {
    @PrimaryColumn({
        type: 'mediumint'
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 16,
        insert: true,
        update: false
    })
    name: string;

    @OneToMany(
        () => FlavorTextEntry,
        flavorTextEntry => flavorTextEntry.language
    )
    flavorTextEntries: FlavorTextEntry[];

    @OneToMany(
        () => GameVersionName,
        gameVersionName => gameVersionName.language
    )
    gameVersionNames: GameVersionName[];

    @OneToMany(
        () => Genera,
        genera => genera.language
    )
    generas: Genera[];

    @OneToMany(
        () => PokemonName,
        pokemonName => pokemonName.language
    )
    pokemonNames: PokemonName[];

    @OneToMany(
        () => RegionName,
        regionName => regionName.language
    )
    regionNames: RegionName[];

    @OneToMany(
        () => TypeName,
        typeName => typeName.language
    )
    typeNames: TypeName[];

    public refer(): void {
        console.table(this);
    }
}

export default Language;
