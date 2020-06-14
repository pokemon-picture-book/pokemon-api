/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn
} from 'typeorm';
import Language from './Language';
import Region from './Region';

@Entity({ name: 'region_names' })
class RegionName extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    id: number;

    @ManyToOne(
        () => Region,
        region => region.regionNames
    )
    @JoinColumn({
        name: 'region_id'
    })
    region: Region;

    @Column({
        type: 'varchar',
        length: 32,
        insert: true,
        update: false
    })
    name: string;

    @ManyToOne(
        () => Language,
        language => language.regionNames
    )
    @JoinColumn({
        name: 'language_id'
    })
    language: Language;

    public refer(): void {
        console.table(this);
    }
}

export default RegionName;
