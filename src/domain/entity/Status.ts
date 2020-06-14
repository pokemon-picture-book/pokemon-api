/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    JoinColumn
} from 'typeorm';
import Pokemon from './Pokemon';

@Entity({ name: 'status' })
class Status extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    public id: number;

    @Column({
        type: 'smallint',
        insert: true,
        update: false
    })
    public hp: number;

    @Column({
        type: 'smallint',
        insert: true,
        update: false
    })
    public attack: number;

    @Column({
        type: 'smallint',
        insert: true,
        update: false
    })
    public defense: number;

    @Column({
        name: 'special_attack',
        type: 'smallint',
        insert: true,
        update: false
    })
    public specialAttack: number;

    @Column({
        name: 'special_defense',
        type: 'smallint',
        insert: true,
        update: false
    })
    public specialDefense: number;

    @Column({
        type: 'smallint',
        insert: true,
        update: false
    })
    public speed: number;

    @OneToOne(
        () => Pokemon,
        pokemon => pokemon.status
    )
    @JoinColumn({
        name: 'pokemon_id'
    })
    public pokemon: Pokemon;

    public refer(): void {
        console.table(this);
    }
}

export default Status;
