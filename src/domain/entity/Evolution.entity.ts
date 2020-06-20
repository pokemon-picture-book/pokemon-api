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
import Pokemon from './Pokemon.entity';
import PokemonEvolution from './PokemonEvolution.entity';

@Entity({ name: 'evolutions' })
class Evolution extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    readonly id: number;

    @OneToMany(
        () => PokemonEvolution,
        pokemonEvolution => pokemonEvolution.evolution
    )
    readonly pokemonEvolutions: PokemonEvolution[];

    @ManyToOne(() => Pokemon)
    @JoinColumn({
        name: 'from_id',
        referencedColumnName: 'id'
    })
    readonly fromPokemon: Pokemon;

    @ManyToOne(() => Pokemon)
    @JoinColumn({
        name: 'to_id',
        referencedColumnName: 'id'
    })
    readonly toPokemon: Pokemon;

    @Column({
        type: 'varchar',
        length: 32,
        insert: true,
        update: false
    })
    readonly trigger: string;

    @Column({
        name: 'detail_1',
        type: 'json',
        insert: true,
        update: false,
        nullable: true
    })
    readonly detail1?: string;

    @Column({
        name: 'detail_2',
        type: 'json',
        insert: true,
        update: false,
        nullable: true
    })
    readonly detail2?: string;

    public refer(): void {
        console.table(this);
    }
}

export default Evolution;
