/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
} from 'typeorm';
import GameVersionGroupEntity from './GameVersionGroup.entity';
import RegionEntity from './Region.entity';

@Entity({ name: 'game_version_groups_regions' })
class GameVersionGroupRegionEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint',
    })
    readonly id: number;

    @ManyToOne(
        () => GameVersionGroupEntity,
        (gameVersionGroup) => gameVersionGroup.gameVersionGroupRegions
    )
    @JoinColumn({
        name: 'game_version_group_id',
    })
    readonly gameVersionGroup: GameVersionGroupEntity;

    @ManyToOne(() => RegionEntity, (region) => region.gameVersionGroupRegions)
    @JoinColumn({
        name: 'region_id',
    })
    readonly region: RegionEntity;

    constructor(
        id?: number,
        gameVersionGroup?: GameVersionGroupEntity,
        region?: RegionEntity
    ) {
        super();
        if (id) {
            this.id = id;
        }
        if (gameVersionGroup) {
            this.gameVersionGroup = gameVersionGroup;
        }
        if (region) {
            this.region = region;
        }
    }

    public refer(): void {
        console.table(this);
    }
}

export default GameVersionGroupRegionEntity;
