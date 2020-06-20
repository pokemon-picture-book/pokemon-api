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

@Entity({ name: 'pokemon_images' })
class PokemonImage extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    readonly id: number;

    @ManyToOne(
        () => Pokemon,
        pokemon => pokemon.pokemonImages
    )
    @JoinColumn({
        name: 'pokemon_id'
    })
    readonly pokemon: Pokemon;

    @Column({
        type: 'text',
        insert: true,
        update: false
    })
    readonly path: string;

    public refer(): void {
        console.table(this);
    }
}

export default PokemonImage;
