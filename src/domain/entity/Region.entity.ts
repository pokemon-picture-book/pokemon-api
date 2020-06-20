/* eslint import/extensions: 0 */
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import Pokemon from './Pokemon.entity';
import RegionName from './RegionName.entity';

@Entity({ name: 'regions' })
class Region extends BaseEntity {
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
    readonly name: string;

    @OneToMany(
        () => Pokemon,
        pokemons => pokemons.region
    )
    readonly pokemons: Pokemon[];

    @OneToMany(
        () => RegionName,
        regionName => regionName.region
    )
    readonly regionNames: RegionName[];

    public refer(): void {
        console.table(this);
    }
}

export default Region;
