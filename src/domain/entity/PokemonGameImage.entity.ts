/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn
} from 'typeorm';
import GameVersionGroup from './GameVersionGroup.entity';
import Pokemon from './Pokemon.entity';

@Entity({ name: 'pokemon_game_images' })
class PokemonGameImage extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    readonly id: number;

    @ManyToOne(
        () => Pokemon,
        pokemon => pokemon.pokemonGameImages
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

    @ManyToOne(
        () => GameVersionGroup,
        gameVersionGroup => gameVersionGroup.pokemonGameImages
    )
    @JoinColumn({
        name: 'game_version_group_id'
    })
    readonly gameVersionGroup: GameVersionGroup;

    public refer(): void {
        console.table(this);
    }
}

export default PokemonGameImage;
