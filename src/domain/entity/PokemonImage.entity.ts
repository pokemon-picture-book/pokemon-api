/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
} from 'typeorm';
import PokemonEntity from './Pokemon.entity';

@Entity({ name: 'pokemon_images' })
class PokemonImageEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint',
    })
    readonly id: number;

    @ManyToOne(() => PokemonEntity, (pokemon) => pokemon.pokemonImages)
    @JoinColumn({
        name: 'pokemon_id',
    })
    readonly pokemon: PokemonEntity;

    @Column({
        type: 'text',
        insert: true,
        update: false,
    })
    readonly path: string;

    public refer(): void {
        console.table(this);
    }
}

export default PokemonImageEntity;
