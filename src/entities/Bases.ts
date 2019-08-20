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
export class Bases extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public hp: number;

  @Column()
  public attack: number;

  @Column()
  public defense: number;

  @Column({
    name: 'sp_attack'
  })
  public spAttack: number;

  @Column({
    name: 'sp_defense'
  })
  public spDefense: number;

  @Column()
  public speed: number;

  @Column()
  public pokemonId: number;

  @OneToOne(() => Pokemons)
  @JoinColumn({ name: 'pokemonId' })
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

export default Bases;
