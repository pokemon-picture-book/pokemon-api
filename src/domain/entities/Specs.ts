import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
    JoinColumn
} from 'typeorm';
import Pokemons from './Pokemons';

@Entity()
export class Specs extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'smallint'
    })
    public hp: number;

    @Column({
        type: 'smallint'
    })
    public attack: number;

    @Column({
        type: 'smallint'
    })
    public defense: number;

    @Column({
        name: 'sp_attack',
        type: 'smallint'
    })
    public spAttack: number;

    @Column({
        name: 'sp_defense',
        type: 'smallint'
    })
    public spDefense: number;

    @Column({
        type: 'smallint'
    })
    public speed: number;

    @Column({
        name: 'pokemon_id'
    })
    public pokemonId: number;

    @OneToOne(() => Pokemons)
    @JoinColumn({ name: 'pokemon_id' })
    public pokemon: Pokemons;

    constructor(
        hp: number,
        attack: number,
        defense: number,
        spAttack: number,
        spDefense: number,
        speed: number,
        pokemonId: number
    ) {
        super();
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.spAttack = spAttack;
        this.spDefense = spDefense;
        this.speed = speed;
        this.pokemonId = pokemonId;
    }

    public refer(): void {
        console.table(this);
    }
}

export default Specs;
