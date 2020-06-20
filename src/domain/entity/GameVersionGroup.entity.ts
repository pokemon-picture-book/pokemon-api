/* eslint import/extensions: 0 */
import { BaseEntity, Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import GameVersion from './GameVersion.entity';
import PokemonGameImage from './PokemonGameImage.entity';

@Entity({ name: 'game_version_groups' })
class GameVersionGroup extends BaseEntity {
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
        () => GameVersion,
        gameVersion => gameVersion.gameVersionGroup
    )
    readonly gameVersions: GameVersion[];

    @OneToMany(
        () => PokemonGameImage,
        pokemonGameImage => pokemonGameImage.gameVersionGroup
    )
    readonly pokemonGameImages: PokemonGameImage[];

    public refer(): void {
        console.table(this);
    }
}

export default GameVersionGroup;
