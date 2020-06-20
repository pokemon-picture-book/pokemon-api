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

@Entity({ name: 'generas' })
class Genera extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    readonly id: number;

    @ManyToOne(
        () => Pokemon,
        pokemon => pokemon.generas
    )
    @JoinColumn({
        name: 'pokemon_id'
    })
    readonly pokemon: Pokemon;

    @Column({
        type: 'text',
        insert: true,
        update: false
    })
    readonly genus: string;

    @ManyToOne(
        () => Language,
        language => language.generas
    )
    @JoinColumn({
        name: 'language_id'
    })
    readonly language: Language;

    public refer(): void {
        console.table(this);
    }
}

export default Genera;
