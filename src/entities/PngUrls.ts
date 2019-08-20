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
export class PngUrls extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    name: 'image_url'
  })
  public imageUrl: string = '';

  @Column({
    name: 'sprite_url'
  })
  public spriteUrl: string = '';

  @Column({
    name: 'thumbnail_url'
  })
  public thumbnailUrl: string = '';

  @Column()
  public pokemonId: number;

  @OneToOne(() => Pokemons)
  @JoinColumn({ name: 'pokemonId' })
  public pokemon: Pokemons;

  constructor(
    imageUrl: string,
    spriteUrl: string,
    thumbnailUrl: string,
    pokemonId: number
  ) {
    super();
    this.imageUrl = imageUrl;
    this.spriteUrl = spriteUrl;
    this.thumbnailUrl = thumbnailUrl;
    this.pokemonId = pokemonId;
  }

  public refer(): void {
    console.table(this);
  }
}

export default PngUrls;
