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

@Entity({ name: 'generas' })
class Genera extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    id: number;

    @ManyToOne(
        () => Pokemon,
        pokemon => pokemon.generas
    )
    @JoinColumn({
        name: 'pokemon_id'
    })
    pokemon: Pokemon;

    @Column({
        type: 'text',
        insert: true,
        update: false
    })
    genus: string;

    @ManyToOne(
        () => Language,
        language => language.generas
    )
    @JoinColumn({
        name: 'language_id'
    })
    language: Language;

    public refer(): void {
        console.table(this);
    }
}

export default Genera;
