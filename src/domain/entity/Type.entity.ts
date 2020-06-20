/* eslint import/extensions: 0 */
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import TypeName from './TypeName.entity';
import PokemonType from './PokemonType.entity';

@Entity({ name: 'types' })
class Type extends BaseEntity {
    @PrimaryColumn()
    readonly id: number;

    @Column({
        type: 'varchar',
        length: 64
    })
    readonly name: string = '';

    @OneToMany(
        () => PokemonType,
        pokemonType => pokemonType.type
    )
    readonly pokemonTypes: PokemonType[];

    @OneToMany(
        () => TypeName,
        typeName => typeName.type
    )
    readonly typeNames: TypeName[];

    public refer(): void {
        console.table(this);
    }
}

export default Type;
