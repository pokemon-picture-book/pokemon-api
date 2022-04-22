/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
    Index
} from 'typeorm';
import LanguageEntity from './Language.entity';
import PokemonEntity from './Pokemon.entity';

@Entity({ name: 'generas' })
@Index(['pokemon', 'language'], { unique: true })
class GeneraEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint'
    })
    readonly id: number;

    @ManyToOne(() => PokemonEntity, (pokemon) => pokemon.generas)
    @JoinColumn({
        name: 'pokemon_id'
    })
    @Index()
    readonly pokemon: PokemonEntity;

    @Column({
        type: 'text',
        insert: true,
        update: false
    })
    readonly genus: string;

    @ManyToOne(() => LanguageEntity, (language) => language.generas)
    @JoinColumn({
        name: 'language_id'
    })
    @Index()
    readonly language: LanguageEntity;

    public refer(): void {
        console.table(this);
    }
}

export default GeneraEntity;
