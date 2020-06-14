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
import FlavorTextEntry from './FlavorTextEntry';
import Genera from './Genera';
import PokemonEvolution from './PokemonEvolution';
import PokemonGameImage from './PokemonGameImage';
import PokemonImage from './PokemonImage';
import PokemonName from './PokemonName';
import PokemonType from './PokemonType';
import Region from './Region';
import Status from './Status';

@Entity({ name: 'pokemons' })
class Pokemon extends BaseEntity {
    @PrimaryColumn({
        type: 'mediumint'
    })
    id: number;

    @Column({
        type: 'smallint',
        insert: true,
        update: false,
        default: 0
    })
    height: number;

    @Column({
        type: 'smallint',
        insert: true,
        update: false,
        default: 0
    })
    weight: number;

    @Column({
        type: 'mediumint',
        insert: true,
        update: false,
        default: 0
    })
    order: number;

    @Column({
        name: 'image_color',
        type: 'varchar',
        length: 32,
        insert: true,
        update: false
    })
    imageColor: string;

    @ManyToOne(
        () => Region,
        region => region.pokemons
    )
    @JoinColumn({
        name: 'region_id'
    })
    region: Region;

    @OneToMany(
        () => PokemonEvolution,
        pokemonEvolution => pokemonEvolution.pokemon
    )
    pokemonEvolutions: PokemonEvolution[];

    @OneToMany(
        () => FlavorTextEntry,
        flavorTextEntry => flavorTextEntry.pokemon
    )
    flavorTextEntries: FlavorTextEntry[];

    @OneToMany(
        () => Genera,
        genera => genera.pokemon
    )
    generas: Genera[];

    @OneToMany(
        () => PokemonGameImage,
        pokemonGameImage => pokemonGameImage.pokemon
    )
    pokemonGameImages: PokemonGameImage[];

    @OneToMany(
        () => PokemonImage,
        pokemonImage => pokemonImage.pokemon
    )
    pokemonImages: PokemonImage[];

    @OneToMany(
        () => PokemonName,
        pokemonName => pokemonName.pokemon
    )
    pokemonNames: PokemonName[];

    @OneToOne(
        () => Status,
        status => status.pokemon
    )
    status: Status;

    @OneToMany(
        () => PokemonType,
        pokemonType => pokemonType.pokemon
    )
    pokemonTypes: PokemonType[];

    public refer(): void {
        console.table(this);
    }
}

export default Pokemon;
