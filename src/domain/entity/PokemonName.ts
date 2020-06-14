/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn
} from 'typeorm';
import Language from './Language';
import Pokemon from './Pokemon';

@Entity({ name: 'pokemon_names' })
class PokemonName extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    id: number;

    @ManyToOne(
        () => Pokemon,
        pokemon => pokemon.pokemonNames
    )
    @JoinColumn({
        name: 'pokemon_id'
    })
    pokemon: Pokemon;

    @Column({
        type: 'varchar',
        length: 32,
        insert: true,
        update: false
    })
    name: string;

    @ManyToOne(
        () => Language,
        language => language.pokemonNames
    )
    @JoinColumn({
        name: 'language_id'
    })
    language: Language;

    public refer(): void {
        console.table(this);
    }
}

export default PokemonName;
