/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
} from 'typeorm';
import LanguageEntity from './Language.entity';
import RegionEntity from './Region.entity';

@Entity({ name: 'region_names' })
class RegionNameEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint',
    })
    readonly id: number;

    @ManyToOne(() => RegionEntity, (region) => region.regionNames)
    @JoinColumn({
        name: 'region_id',
    })
    readonly region: RegionEntity;

    @Column({
        type: 'varchar',
        length: 32,
        insert: true,
        update: false,
    })
    readonly name: string;

    @ManyToOne(() => LanguageEntity, (language) => language.regionNames)
    @JoinColumn({
        name: 'language_id',
    })
    readonly language: LanguageEntity;

    public refer(): void {
        console.table(this);
    }
}

export default RegionNameEntity;
