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

@Entity({ name: 'flavor_text_entries' })
class FlavorTextEntry extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    id: number;

    @ManyToOne(
        () => Pokemon,
        pokemon => pokemon.flavorTextEntries
    )
    @JoinColumn({
        name: 'pokemon_id'
    })
    pokemon: Pokemon;

    @Column({
        name: 'flavor_text',
        type: 'text',
        insert: true,
        update: false
    })
    flavorText: string;

    @ManyToOne(
        () => Language,
        language => language.flavorTextEntries
    )
    @JoinColumn({
        name: 'language_id'
    })
    language: Language;

    public refer(): void {
        console.table(this);
    }
}

export default FlavorTextEntry;
