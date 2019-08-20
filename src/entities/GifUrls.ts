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
export class GifUrls extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    nullable: true
  })
  public url: string = '';

  @Column()
  public pokemonId: number;

  @ManyToOne(() => Pokemons, pokemon => pokemon.gifUrls)
  @JoinColumn({ name: 'pokemonId' })
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

export default GifUrls;
