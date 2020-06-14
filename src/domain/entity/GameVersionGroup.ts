/* eslint import/extensions: 0 */
import { BaseEntity, Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import GameVersion from './GameVersion';
import PokemonGameImage from './PokemonGameImage';

@Entity({ name: 'game_version_groups' })
class GameVersionGroup extends BaseEntity {
    @PrimaryColumn({
        type: 'mediumint'
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 16,
        insert: true,
        update: false
    })
    alias: string;

    @OneToMany(
        () => GameVersion,
        gameVersion => gameVersion.gameVersionGroup
    )
    gameVersions: GameVersion[];

    @OneToMany(
        () => PokemonGameImage,
        pokemonGameImage => pokemonGameImage.gameVersionGroup
    )
    pokemonGameImages: PokemonGameImage[];

    public refer(): void {
        console.table(this);
    }
}

export default GameVersionGroup;
