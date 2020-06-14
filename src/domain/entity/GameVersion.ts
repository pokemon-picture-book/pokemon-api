/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryColumn,
    OneToMany,
    JoinColumn
} from 'typeorm';
import GameVersionName from './GameVersionName';
import GameVersionGroup from './GameVersionGroup';

@Entity({ name: 'game_versions' })
class GameVersion extends BaseEntity {
    @PrimaryColumn({
        type: 'mediumint'
    })
    id: number;

    @OneToMany(
        () => GameVersionName,
        gameVersionName => gameVersionName.gameVersion
    )
    gameVersionNames: GameVersionName[];

    @Column({
        type: 'varchar',
        length: 32,
        insert: true,
        update: false
    })
    name: string;

    @ManyToOne(
        () => GameVersionGroup,
        gameVersionGroup => gameVersionGroup.gameVersions
    )
    @JoinColumn({
        name: 'game_version_group_id'
    })
    gameVersionGroup: GameVersionGroup;

    public refer(): void {
        console.table(this);
    }
}

export default GameVersion;
