/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
} from 'typeorm';
import LanguageEntity from './Language.entity';
import PokemonEntity from './Pokemon.entity';

@Entity({ name: 'flavor_text_entries' })
class FlavorTextEntryEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'mediumint',
    })
    readonly id: number;

    @ManyToOne(() => PokemonEntity, (pokemon) => pokemon.flavorTextEntries)
    @JoinColumn({
        name: 'pokemon_id',
    })
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
    readonly language: LanguageEntity;

    public refer(): void {
        console.table(this);
    }
}

export default FlavorTextEntryEntity;
