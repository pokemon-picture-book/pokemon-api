import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import Pokemons from './Pokemons';

@Entity()
export class Gifs extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    nullable: true
  })
  public url: string = '';

  @Column({
    name: 'pokemon_id'
  })
  public pokemonId: number;

  @ManyToOne(() => Pokemons, pokemon => pokemon.gifs)
  @JoinColumn({ name: 'pokemon_id' })
  public pokemon: Pokemons;

  constructor(url: string, pokemonId: number) {
    super();
    this.url = url;
    this.pokemonId = pokemonId;
  }

  public refer(): void {
    console.table(this);
  }
}

export default Gifs;
