/* eslint import/extensions: 0 */
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import TypeName from './TypeName';
import PokemonType from './PokemonType';

@Entity({ name: 'types' })
class Type extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 64
    })
    name: string = '';

    @OneToMany(
        () => PokemonType,
        pokemonType => pokemonType.type
    )
    pokemonTypes: PokemonType[];

    @OneToMany(
        () => TypeName,
        typeName => typeName.type
    )
    typeNames: TypeName[];

    public refer(): void {
        console.table(this);
    }
}

export default Type;
