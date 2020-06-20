/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import Language from './Language.entity';
import GameVersion from './GameVersion.entity';

@Entity({ name: 'game_version_names' })
class GameVersionName extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    readonly id: number;

    @ManyToOne(
        () => GameVersion,
        gameVersion => gameVersion.gameVersionNames
    )
    @JoinColumn({
        name: 'game_version_id'
    })
    readonly gameVersion: GameVersion;

    @Column({
        type: 'varchar',
        length: 32,
        insert: true,
        update: false
    })
    readonly name: string;

    @ManyToOne(
        () => Language,
        language => language.gameVersionNames
    )
    @JoinColumn({
        name: 'language_id'
    })
    readonly language: Language;

    public refer(): void {
        console.table(this);
    }
}

export default GameVersionName;
