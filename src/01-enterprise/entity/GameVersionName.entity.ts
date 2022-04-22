/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import LanguageEntity from './Language.entity';
import GameVersionEntity from './GameVersion.entity';

@Entity({ name: 'game_version_names' })
class GameVersionNameEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    readonly id: number;

    @ManyToOne(
        () => GameVersionEntity,
        (gameVersion) => gameVersion.gameVersionNames
    )
    @JoinColumn({
        name: 'game_version_id'
    })
    readonly gameVersion: GameVersionEntity;

    @Column({
        type: 'varchar',
        length: 32,
        insert: true,
        update: false
    })
    readonly name: string;

    @ManyToOne(() => LanguageEntity, (language) => language.gameVersionNames)
    @JoinColumn({
        name: 'language_id'
    })
    readonly language: LanguageEntity;

    public refer(): void {
        console.table(this);
    }
}

export default GameVersionNameEntity;
