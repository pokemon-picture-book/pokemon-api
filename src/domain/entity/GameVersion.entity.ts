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
import GameVersionNameEntity from './GameVersionName.entity';
import GameVersionGroupEntity from './GameVersionGroup.entity';

@Entity({ name: 'game_versions' })
class GameVersionEntity extends BaseEntity {
    @PrimaryColumn({
        type: 'mediumint'
    })
    readonly id: number;

    @OneToMany(
        () => GameVersionNameEntity,
        gameVersionName => gameVersionName.gameVersion
    )
    readonly gameVersionNames: GameVersionNameEntity[];

    @Column({
        type: 'varchar',
        length: 32,
        insert: true,
        update: false
    })
    readonly name: string;

    @ManyToOne(
        () => GameVersionGroupEntity,
        gameVersionGroup => gameVersionGroup.gameVersions
    )
    @JoinColumn({
        name: 'game_version_group_id'
    })
    readonly gameVersionGroup: GameVersionGroupEntity;

    public refer(): void {
        console.table(this);
    }
}

export default GameVersionEntity;
