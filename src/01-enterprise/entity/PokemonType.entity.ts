/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn
} from 'typeorm';
import PokemonEntity from './Pokemon.entity';
import TypeEntity from './Type.entity';

@Entity({ name: 'pokemons_types' })
class PokemonTypeEntity extends BaseEntity {
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

    @ManyToOne(() => PokemonEntity, (pokemon) => pokemon.pokemonTypes)
    @JoinColumn({
        name: 'pokemon_id'
    })
    readonly pokemon: PokemonEntity;

    @ManyToOne(() => TypeEntity, (type) => type.pokemonTypes)
    @JoinColumn({
        name: 'type_id'
    })
    readonly type: TypeEntity;

    public refer(): void {
        console.table(this);
    }
}

export default PokemonTypeEntity;
