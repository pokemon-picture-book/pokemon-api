/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
    Index,
} from 'typeorm';
import GameVersionGroupEntity from './GameVersionGroup.entity';
import PokemonEntity from './Pokemon.entity';

@Entity({ name: 'pokemon_game_images' })
@Index(['pokemon', 'gameVersionGroup'])
class PokemonGameImageEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint',
    })
    readonly id: number;

    @ManyToOne(() => PokemonEntity, (pokemon) => pokemon.pokemonGameImages)
    @JoinColumn({
        name: 'pokemon_id',
    })
    @Index()
    readonly pokemon: PokemonEntity;

    @Column({
        type: 'text',
        insert: true,
        update: false,
    })
    readonly path: string;

    @Column({
        name: 'is_main',
        type: 'boolean',
        insert: true,
        update: false,
    })
    readonly isMain: boolean;

    @Column({
        name: 'is_handheld_icon',
        type: 'boolean',
        insert: true,
        update: false,
    })
    readonly isHandheldIcon: boolean;

    @Column({
        name: 'is_shiny',
        type: 'boolean',
        insert: true,
        update: false,
    })
    readonly isShiny: boolean;

    @ManyToOne(
        () => GameVersionGroupEntity,
        (gameVersionGroup) => gameVersionGroup.pokemonGameImages
    )
    @JoinColumn({
        name: 'game_version_group_id',
    })
    @Index()
    readonly gameVersionGroup: GameVersionGroupEntity;

    public refer(): void {
        console.table(this);
    }
}

export default PokemonGameImageEntity;
