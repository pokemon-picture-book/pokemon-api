/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn
} from 'typeorm';
import Language from './Language.entity';
import Pokemon from './Pokemon.entity';

@Entity({ name: 'pokemon_names' })
class PokemonName extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    readonly id: number;

    @ManyToOne(
        () => Pokemon,
        pokemon => pokemon.pokemonNames
    )
    @JoinColumn({
        name: 'pokemon_id'
    })
    readonly pokemon: Pokemon;

    @Column({
        type: 'varchar',
        length: 32,
        insert: true,
        update: false
    })
    readonly name: string;

    @ManyToOne(
        () => Language,
        language => language.pokemonNames
    )
    @JoinColumn({
        name: 'language_id'
    })
    readonly language: Language;

    public refer(): void {
        console.table(this);
    }
}

export default PokemonName;
