/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import Language from './Language';
import GameVersion from './GameVersion';

@Entity({ name: 'game_version_names' })
class GameVersionName extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    id: number;

    @ManyToOne(
        () => GameVersion,
        gameVersion => gameVersion.gameVersionNames
    )
    @JoinColumn({
        name: 'game_version_id'
    })
    gameVersion: GameVersion;

    @Column({
        type: 'varchar',
        length: 32,
        insert: true,
        update: false
    })
    name: string;

    @ManyToOne(
        () => Language,
        language => language.gameVersionNames
    )
    @JoinColumn({
        name: 'language_id'
    })
    language: Language;

    public refer(): void {
        console.table(this);
    }
}

export default GameVersionName;
