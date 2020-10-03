/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn
} from 'typeorm';
import LanguageEntity from './Language.entity';
import PokemonEntity from './Pokemon.entity';

@Entity({ name: 'pokemon_names' })
class PokemonNameEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    readonly id: number;

    @ManyToOne(
        () => PokemonEntity,
        pokemon => pokemon.pokemonNames
    )
    @JoinColumn({
        name: 'pokemon_id'
    })
    readonly pokemon: PokemonEntity;

    @Column({
        type: 'varchar',
        length: 32,
        insert: true,
        update: false
    })
    readonly name: string;

    @ManyToOne(
        () => LanguageEntity,
        language => language.pokemonNames
    )
    @JoinColumn({
        name: 'language_id'
    })
    readonly language: LanguageEntity;

    public refer(): void {
        console.table(this);
    }
}

export default PokemonNameEntity;
