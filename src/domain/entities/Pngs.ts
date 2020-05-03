import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
    JoinColumn
} from 'typeorm';
import Pokemons from '@/domain/entities/Pokemons';

@Entity()
export class Pngs extends BaseEntity {
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
        name: 'pokemon_id'
    })
    public pokemonId: number;

    @OneToOne(() => Pokemons)
    @JoinColumn({ name: 'pokemon_id' })
    public pokemon: Pokemons;

    constructor(imageUrl: string, spriteUrl: string, pokemonId: number) {
        super();
        this.imageUrl = imageUrl;
        this.spriteUrl = spriteUrl;
        this.pokemonId = pokemonId;
    }

    public refer(): void {
        console.table(this);
    }
}

export default Pngs;
