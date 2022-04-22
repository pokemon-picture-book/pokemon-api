/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn
} from 'typeorm';
import EvolutionEntity from './Evolution.entity';
import PokemonEntity from './Pokemon.entity';

@Entity({ name: 'pokemons_evolutions' })
class PokemonEvolutionEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    readonly id: number;

    @ManyToOne(() => PokemonEntity, (pokemon) => pokemon.pokemonEvolutions)
    @JoinColumn({
        name: 'pokemon_id'
    })
    readonly pokemon: PokemonEntity;

    @ManyToOne(
        () => EvolutionEntity,
        (evolution) => evolution.pokemonEvolutions
    )
    @JoinColumn({
        name: 'evolution_id'
    })
    readonly evolution: EvolutionEntity;

    public refer(): void {
        console.table(this);
    }
}

export default PokemonEvolutionEntity;
