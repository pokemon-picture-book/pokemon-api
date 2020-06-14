/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import Pokemon from './Pokemon';
import PokemonEvolution from './PokemonEvolution';

@Entity({ name: 'evolutions' })
class Evolution extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    id: number;

    @OneToMany(
        () => PokemonEvolution,
        pokemonEvolution => pokemonEvolution.evolution
    )
    pokemonEvolutions: PokemonEvolution[];

    @ManyToOne(() => Pokemon)
    @JoinColumn({
        name: 'from_id',
        referencedColumnName: 'id'
    })
    fromPokemon: Pokemon;

    @ManyToOne(() => Pokemon)
    @JoinColumn({
        name: 'to_id',
        referencedColumnName: 'id'
    })
    toPokemon: Pokemon;

    @Column({
        type: 'varchar',
        length: 32,
        insert: true,
        update: false
    })
    trigger: string;

    @Column({
        name: 'detail_1',
        type: 'json',
        insert: true,
        update: false,
        nullable: true
    })
    detail1: string;

    @Column({
        name: 'detail_2',
        type: 'json',
        insert: true,
        update: false,
        nullable: true
    })
    detail2: string;

    public refer(): void {
        console.table(this);
    }
}

export default Evolution;
