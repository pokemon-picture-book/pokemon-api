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

  @Column({
    name: 'pokemon_id'
  })
  public pokemonId: number;

  @Column({
    name: 'type_id'
  })
  public typeId: number;

  @ManyToOne(() => Pokemons)
  @JoinColumn({ name: 'pokemon_id' })
  public pokemon: Pokemons;

  @ManyToOne(() => Types)
  @JoinColumn({ name: 'type_id' })
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
