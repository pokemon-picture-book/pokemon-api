/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn
} from 'typeorm';
import Pokemon from './Pokemon';
import Type from './Type';

@Entity({ name: 'pokemons_types' })
class PokemonType extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    id: number;

    @Column({
        type: 'smallint',
        insert: true,
        update: false,
        default: 0
    })
    order: number;

    @ManyToOne(
        () => Pokemon,
        pokemon => pokemon.pokemonTypes
    )
    @JoinColumn({
        name: 'pokemon_id'
    })
    pokemon: Pokemon;

    @ManyToOne(
        () => Type,
        type => type.pokemonTypes
    )
    @JoinColumn({
        name: 'type_id'
    })
    type: Type;

    public refer(): void {
        console.table(this);
    }
}

export default PokemonType;
