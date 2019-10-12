import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    OneToMany
} from 'typeorm';
import PokemonTypes from './PokemonTypes';

@Entity()
export class Types extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'varchar',
        length: 60,
        unique: true,
        nullable: true
    })
    public code: string = '';

    @Column({
        type: 'varchar',
        length: 60,
        nullable: true
    })
    public name: string = '';

    @OneToMany(() => PokemonTypes, pokemonTypes => pokemonTypes.types)
    public pokemonTypes: PokemonTypes[];

    constructor(code: string, name: string) {
        super();
        this.code = code;
        this.name = name;
    }

    public refer(): void {
        console.table(this);
    }
}

export default Types;
