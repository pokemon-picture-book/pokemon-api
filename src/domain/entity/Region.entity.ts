/* eslint import/extensions: 0 */
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import PokemonEntity from './Pokemon.entity';
import RegionNameEntity from './RegionName.entity';

@Entity({ name: 'regions' })
class RegionEntity extends BaseEntity {
    @PrimaryColumn({
        type: 'mediumint',
    })
    readonly id: number;

    @Column({
        type: 'varchar',
        length: 16,
        insert: true,
        update: false,
    })
    readonly name: string;

    @OneToMany(() => PokemonEntity, (pokemons) => pokemons.region)
    readonly pokemons: PokemonEntity[];

    @OneToMany(() => RegionNameEntity, (regionName) => regionName.region)
    readonly regionNames: RegionNameEntity[];

    constructor(
        id: number,
        name: string,
        pokemons: PokemonEntity[],
        regionNames: RegionNameEntity[]
    ) {
        super();
        this.id = id;
        this.name = name;
        this.pokemons = pokemons;
        this.regionNames = regionNames;
    }

    public refer(): void {
        console.table(this);
    }
}

export default RegionEntity;
