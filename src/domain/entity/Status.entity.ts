/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
} from 'typeorm';
import PokemonEntity from './Pokemon.entity';

@Entity({ name: 'status' })
class StatusEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint',
    })
    readonly id: number;

    @Column({
        type: 'smallint',
        insert: true,
        update: false,
    })
    readonly hp: number;

    @Column({
        type: 'smallint',
        insert: true,
        update: false,
    })
    readonly attack: number;

    @Column({
        type: 'smallint',
        insert: true,
        update: false,
    })
    readonly defense: number;

    @Column({
        name: 'special_attack',
        type: 'smallint',
        insert: true,
        update: false,
    })
    readonly specialAttack: number;

    @Column({
        name: 'special_defense',
        type: 'smallint',
        insert: true,
        update: false,
    })
    readonly specialDefense: number;

    @Column({
        type: 'smallint',
        insert: true,
        update: false,
    })
    readonly speed: number;

    @OneToOne(() => PokemonEntity, (pokemon) => pokemon.status)
    @JoinColumn({
        name: 'pokemon_id',
    })
    readonly pokemon: PokemonEntity;

    public refer(): void {
        console.table(this);
    }
}

export default StatusEntity;
