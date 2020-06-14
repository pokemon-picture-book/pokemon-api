/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn
} from 'typeorm';
import GameVersionGroup from './GameVersionGroup';
import Pokemon from './Pokemon';

@Entity({ name: 'pokemon_game_images' })
class PokemonGameImage extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    id: number;

    @ManyToOne(
        () => Pokemon,
        pokemon => pokemon.pokemonGameImages
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

    @ManyToOne(
        () => GameVersionGroup,
        gameVersionGroup => gameVersionGroup.pokemonGameImages
    )
    @JoinColumn({
        name: 'game_version_group_id'
    })
    gameVersionGroup: GameVersionGroup;

    public refer(): void {
        console.table(this);
    }
}

export default PokemonGameImage;
