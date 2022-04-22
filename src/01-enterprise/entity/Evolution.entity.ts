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
import PokemonEntity from './Pokemon.entity';
import PokemonEvolutionEntity from './PokemonEvolution.entity';

@Entity({ name: 'evolutions' })
class EvolutionEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    readonly id: number;

    @OneToMany(
        () => PokemonEvolutionEntity,
        (pokemonEvolution) => pokemonEvolution.evolution
    )
    readonly pokemonEvolutions: PokemonEvolutionEntity[];

    @Column({
        name: 'from_id'
    })
    readonly fromId: number;

    @ManyToOne(() => PokemonEntity)
    @JoinColumn({
        name: 'from_id',
        referencedColumnName: 'id'
    })
    readonly fromPokemon: PokemonEntity;

    @Column({
        name: 'to_id'
    })
    readonly toId: number;

    @ManyToOne(() => PokemonEntity)
    @JoinColumn({
        name: 'to_id',
        referencedColumnName: 'id'
    })
    readonly toPokemon: PokemonEntity;

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

export default EvolutionEntity;
