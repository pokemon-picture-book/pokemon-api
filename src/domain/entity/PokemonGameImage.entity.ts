/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
} from 'typeorm';
import GameVersionGroupEntity from './GameVersionGroup.entity';
import PokemonEntity from './Pokemon.entity';

@Entity({ name: 'pokemon_game_images' })
class PokemonGameImageEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint',
    })
    readonly id: number;

    @ManyToOne(() => PokemonEntity, (pokemon) => pokemon.pokemonGameImages)
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

    @ManyToOne(
        () => GameVersionGroupEntity,
        (gameVersionGroup) => gameVersionGroup.pokemonGameImages
    )
    @JoinColumn({
        name: 'game_version_group_id',
    })
    readonly gameVersionGroup: GameVersionGroupEntity;

    public refer(): void {
        console.table(this);
    }
}

export default PokemonGameImageEntity;
