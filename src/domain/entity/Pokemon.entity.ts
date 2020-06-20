/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn
} from 'typeorm';
import FlavorTextEntry from './FlavorTextEntry.entity';
import Genera from './Genera.entity';
import PokemonEvolution from './PokemonEvolution.entity';
import PokemonGameImage from './PokemonGameImage.entity';
import PokemonImage from './PokemonImage.entity';
import PokemonName from './PokemonName.entity';
import PokemonType from './PokemonType.entity';
import Region from './Region.entity';
import Status from './Status.entity';

@Entity({ name: 'pokemons' })
class Pokemon extends BaseEntity {
    @PrimaryColumn({
        type: 'mediumint'
    })
    readonly id: number;

    @Column({
        type: 'smallint',
        insert: true,
        update: false,
        default: 0
    })
    readonly height: number;

    @Column({
        type: 'smallint',
        insert: true,
        update: false,
        default: 0
    })
    readonly weight: number;

    @Column({
        type: 'mediumint',
        insert: true,
        update: false,
        default: 0
    })
    readonly order: number;

    @Column({
        name: 'image_color',
        type: 'varchar',
        length: 32,
        insert: true,
        update: false
    })
    readonly imageColor: string;

    @ManyToOne(
        () => Region,
        region => region.pokemons
    )
    @JoinColumn({
        name: 'region_id'
    })
    readonly region: Region;

    @OneToMany(
        () => PokemonEvolution,
        pokemonEvolution => pokemonEvolution.pokemon
    )
    readonly pokemonEvolutions: PokemonEvolution[];

    @OneToMany(
        () => FlavorTextEntry,
        flavorTextEntry => flavorTextEntry.pokemon
    )
    readonly flavorTextEntries: FlavorTextEntry[];

    @OneToMany(
        () => Genera,
        genera => genera.pokemon
    )
    readonly generas: Genera[];

    @OneToMany(
        () => PokemonGameImage,
        pokemonGameImage => pokemonGameImage.pokemon
    )
    readonly pokemonGameImages: PokemonGameImage[];

    @OneToMany(
        () => PokemonImage,
        pokemonImage => pokemonImage.pokemon
    )
    readonly pokemonImages: PokemonImage[];

    @OneToMany(
        () => PokemonName,
        pokemonName => pokemonName.pokemon
    )
    readonly pokemonNames: PokemonName[];

    @OneToOne(
        () => Status,
        status => status.pokemon
    )
    readonly status: Status;

    @OneToMany(
        () => PokemonType,
        pokemonType => pokemonType.pokemon
    )
    readonly pokemonTypes: PokemonType[];

    public refer(): void {
        console.table(this);
    }
}

export default Pokemon;
