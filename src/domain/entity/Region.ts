/* eslint import/extensions: 0 */
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import Pokemon from './Pokemon';
import RegionName from './RegionName';

@Entity({ name: 'regions' })
class Region extends BaseEntity {
    @PrimaryColumn({
        type: 'mediumint'
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 16,
        insert: true,
        update: false
    })
    name: string;

    @OneToMany(
        () => Pokemon,
        pokemons => pokemons.region
    )
    pokemons: Pokemon[];

    @OneToMany(
        () => RegionName,
        regionName => regionName.region
    )
    regionNames: RegionName[];

    public refer(): void {
        console.table(this);
    }
}

export default Region;
