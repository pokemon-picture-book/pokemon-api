import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import Pokemons from './Pokemons';
import Types from './Types';

@Entity()
export class PokemonTypes extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public pokemonId: number;

  @Column()
  public typeId: number;

  @ManyToOne(() => Pokemons)
  @JoinColumn({ name: 'pokemonId' })
  public pokemon: Pokemons;

  @ManyToOne(() => Types)
  @JoinColumn({ name: 'typeId' })
  public types: Types;

  constructor(pokemonId: number, typeId: number) {
    super();
    this.pokemonId = pokemonId;
    this.typeId = typeId;
  }

  public refer(): void {
    console.table(this);
  }
}

export default PokemonTypes;
