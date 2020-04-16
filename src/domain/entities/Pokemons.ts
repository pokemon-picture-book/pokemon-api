import {
    Entity,
    PrimaryColumn,
    Column,
    BaseEntity,
    OneToMany,
    OneToOne
} from 'typeorm';
import Pngs from './Pngs';
import PokemonTypes from './PokemonTypes';
import Specs from './Specs';

@Entity()
export class Pokemons extends BaseEntity {
    @PrimaryColumn()
    public id: number;

    @Column({
        type: 'varchar',
        length: 60,
        unique: true
    })
    public code: string = '';

    @Column({
        type: 'varchar',
        length: 60
    })
    public name: string = '';

    @Column({
        type: 'varchar',
        length: 255,
        name: 'flavor_text',
        nullable: true
    })
    public flavorText: string;

    @Column({
        type: 'smallint',
        name: 'generation_no'
    })
    public generationNo: number;

    @OneToOne(() => Specs, spec => spec.pokemon)
    public spec: Specs;

    @OneToOne(() => Pngs, pngs => pngs.pokemon)
    public pngs: Pngs;

    @OneToMany(() => PokemonTypes, pokemonTypes => pokemonTypes.pokemon)
    public pokemonTypes: PokemonTypes[];

    constructor(id: number, code: string, name: string) {
        super();
        this.id = id;
        this.code = code;
        this.name = name;
    }

    public refer(): void {
        console.table(this);
    }
}

export default Pokemons;
