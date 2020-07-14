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
        () => FlavorTextEntryEntity,
        flavorTextEntry => flavorTextEntry.language
    )
    readonly flavorTextEntries: FlavorTextEntryEntity[];

    @OneToMany(
        () => GameVersionNameEntity,
        gameVersionName => gameVersionName.language
    )
    readonly gameVersionNames: GameVersionNameEntity[];

    @OneToMany(
        () => GeneraEntity,
        genera => genera.language
    )
    readonly generas: GeneraEntity[];

    @OneToMany(
        () => PokemonNameEntity,
        pokemonName => pokemonName.language
    )
    readonly pokemonNames: PokemonNameEntity[];

    @OneToMany(
        () => RegionNameEntity,
        regionName => regionName.language
    )
    readonly regionNames: RegionNameEntity[];

    @OneToMany(
        () => TypeNameEntity,
        typeName => typeName.language
    )
    readonly typeNames: TypeNameEntity[];

    public refer(): void {
        console.table(this);
    }
}

export default LanguageEntity;
