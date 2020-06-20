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

@Entity({ name: 'flavor_text_entries' })
class FlavorTextEntry extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    readonly id: number;

    @ManyToOne(
        () => Pokemon,
        pokemon => pokemon.flavorTextEntries
    )
    @JoinColumn({
        name: 'pokemon_id'
    })
    readonly pokemon: Pokemon;

    @Column({
        name: 'flavor_text',
        type: 'text',
        insert: true,
        update: false
    })
    readonly flavorText: string;

    @ManyToOne(
        () => Language,
        language => language.flavorTextEntries
    )
    @JoinColumn({
        name: 'language_id'
    })
    readonly language: Language;

    public refer(): void {
        console.table(this);
    }
}

export default FlavorTextEntry;
