/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn
} from 'typeorm';
import Evolution from './Evolution.entity';
import Pokemon from './Pokemon.entity';

@Entity({ name: 'pokemons_evolutions' })
class PokemonEvolution extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    readonly id: number;

    @ManyToOne(
        () => Pokemon,
        pokemon => pokemon.pokemonEvolutions
    )
    @JoinColumn({
        name: 'pokemon_id'
    })
    readonly pokemon: Pokemon;

    @ManyToOne(
        () => Evolution,
        evolution => evolution.pokemonEvolutions
    )
    @JoinColumn({
        name: 'evolution_id'
    })
    readonly evolution: Evolution;

    public refer(): void {
        console.table(this);
    }
}

export default PokemonEvolution;
