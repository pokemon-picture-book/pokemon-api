/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
    Index,
} from 'typeorm';
import LanguageEntity from './Language.entity';
import PokemonEntity from './Pokemon.entity';

@Entity({ name: 'flavor_text_entries' })
@Index(['pokemon', 'language'], { unique: true })
class FlavorTextEntryEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint',
    })
    readonly id: number;

    @ManyToOne(() => PokemonEntity, (pokemon) => pokemon.flavorTextEntries)
    @JoinColumn({
        name: 'pokemon_id',
    })
    @Index()
    readonly pokemon: PokemonEntity;

    @Column({
        name: 'flavor_text',
        type: 'text',
        insert: true,
        update: false,
    })
    readonly flavorText: string;

    @ManyToOne(() => LanguageEntity, (language) => language.flavorTextEntries)
    @JoinColumn({
        name: 'language_id',
    })
    @Index()
    readonly language: LanguageEntity;

    public refer(): void {
        console.table(this);
    }
}

export default FlavorTextEntryEntity;
