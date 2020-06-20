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
import GameVersionName from './GameVersionName.entity';
import GameVersionGroup from './GameVersionGroup.entity';

@Entity({ name: 'game_versions' })
class GameVersion extends BaseEntity {
    @PrimaryColumn({
        type: 'mediumint'
    })
    readonly id: number;

    @OneToMany(
        () => GameVersionName,
        gameVersionName => gameVersionName.gameVersion
    )
    readonly gameVersionNames: GameVersionName[];

    @Column({
        type: 'varchar',
        length: 32,
        insert: true,
        update: false
    })
    readonly name: string;

    @ManyToOne(
        () => GameVersionGroup,
        gameVersionGroup => gameVersionGroup.gameVersions
    )
    @JoinColumn({
        name: 'game_version_group_id'
    })
    readonly gameVersionGroup: GameVersionGroup;

    public refer(): void {
        console.table(this);
    }
}

export default GameVersion;
