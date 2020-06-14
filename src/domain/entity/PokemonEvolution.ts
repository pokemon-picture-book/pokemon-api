/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn
} from 'typeorm';
import Evolution from './Evolution';
import Pokemon from './Pokemon';

@Entity({ name: 'pokemons_evolutions' })
class PokemonEvolution extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    id: number;

    @ManyToOne(
        () => Pokemon,
        pokemon => pokemon.pokemonEvolutions
    )
    @JoinColumn({
        name: 'pokemon_id'
    })
    pokemon: Pokemon;

    @ManyToOne(
        () => Evolution,
        evolution => evolution.pokemonEvolutions
    )
    @JoinColumn({
        name: 'evolution_id'
    })
    evolution: Evolution;

    public refer(): void {
        console.table(this);
    }
}

export default PokemonEvolution;
