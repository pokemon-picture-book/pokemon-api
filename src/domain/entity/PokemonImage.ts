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

@Entity({ name: 'pokemon_images' })
class PokemonImage extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    id: number;

    @ManyToOne(
        () => Pokemon,
        pokemon => pokemon.pokemonImages
    )
    @JoinColumn({
        name: 'pokemon_id'
    })
    pokemon: Pokemon;

    @Column({
        type: 'text',
        insert: true,
        update: false
    })
    path: string;

    public refer(): void {
        console.table(this);
    }
}

export default PokemonImage;
