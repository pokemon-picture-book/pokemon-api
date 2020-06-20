/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn
} from 'typeorm';
import Pokemon from './Pokemon.entity';
import Type from './Type.entity';

@Entity({ name: 'pokemons_types' })
class PokemonType extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    readonly id: number;

    @Column({
        type: 'smallint',
        insert: true,
        update: false,
        default: 0
    })
    readonly order: number;

    @ManyToOne(
        () => Pokemon,
        pokemon => pokemon.pokemonTypes
    )
    @JoinColumn({
        name: 'pokemon_id'
    })
    readonly pokemon: Pokemon;

    @ManyToOne(
        () => Type,
        type => type.pokemonTypes
    )
    @JoinColumn({
        name: 'type_id'
    })
    readonly type: Type;

    public refer(): void {
        console.table(this);
    }
}

export default PokemonType;
