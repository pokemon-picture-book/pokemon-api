/* eslint import/extensions: 0 */
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import TypeNameEntity from './TypeName.entity';
import PokemonTypeEntity from './PokemonType.entity';

@Entity({ name: 'types' })
class TypeEntity extends BaseEntity {
    @PrimaryColumn()
    readonly id: number;

    @Column({
        type: 'varchar',
        length: 64,
    })
    readonly name: string = '';

    @OneToMany(() => PokemonTypeEntity, (pokemonType) => pokemonType.type)
    readonly pokemonTypes: PokemonTypeEntity[];

    @OneToMany(() => TypeNameEntity, (typeName) => typeName.type)
    readonly typeNames: TypeNameEntity[];

    public refer(): void {
        console.table(this);
    }
}

export default TypeEntity;
