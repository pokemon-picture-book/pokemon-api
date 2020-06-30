/* eslint import/extensions: 0 */
import { BaseEntity, Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import GameVersionEntity from './GameVersion.entity';
import PokemonGameImageEntity from './PokemonGameImage.entity';

@Entity({ name: 'game_version_groups' })
class GameVersionGroupEntity extends BaseEntity {
    @PrimaryColumn({
        type: 'mediumint'
    })
    readonly id: number;

    @Column({
        type: 'varchar',
        length: 16,
        insert: true,
        update: false
    })
    readonly alias: string;

    @OneToMany(
        () => GameVersionEntity,
        gameVersion => gameVersion.gameVersionGroup
    )
    readonly gameVersions: GameVersionEntity[];

    @OneToMany(
        () => PokemonGameImageEntity,
        pokemonGameImage => pokemonGameImage.gameVersionGroup
    )
    readonly pokemonGameImages: PokemonGameImageEntity[];

    public refer(): void {
        console.table(this);
    }
}

export default GameVersionGroupEntity;
