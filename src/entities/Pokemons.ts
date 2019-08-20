import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  OneToMany,
  OneToOne
} from 'typeorm';
import GifUrls from './GifUrls';
import PngUrls from './PngUrls';
import PokemonTypes from './PokemonTypes';
import Bases from './Bases';

@Entity()
export class Pokemons extends BaseEntity {
  @PrimaryColumn()
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

  @OneToMany(() => GifUrls, gifUrls => gifUrls.pokemon)
  public gifUrls: GifUrls[];

  @OneToOne(() => Bases, bases => bases.pokemon)
  public bases: Bases;

  @OneToOne(() => PngUrls, pngUrls => pngUrls.pokemon)
  public pngUrls: PngUrls;

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
