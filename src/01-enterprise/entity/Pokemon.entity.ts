/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn
} from 'typeorm';
import FlavorTextEntryEntity from './FlavorTextEntry.entity';
import GeneraEntity from './Genera.entity';
import PokemonEvolutionEntity from './PokemonEvolution.entity';
import PokemonGameImageEntity from './PokemonGameImage.entity';
import PokemonFootmarkImage from './PokemonFootmarkImage.entity';
import PokemonWarkImage from './PokemonWarkImage.entity';
import PokemonNameEntity from './PokemonName.entity';
import PokemonTypeEntity from './PokemonType.entity';
import RegionEntity from './Region.entity';
import StatusEntity from './Status.entity';

@Entity({ name: 'pokemons' })
class PokemonEntity extends BaseEntity {
    @PrimaryColumn({
        type: 'mediumint'
    })
    readonly id: number;

    @Column({
        type: 'smallint',
        insert: true,
        update: false,
        default: 0
    })
    readonly height: number;

    @Column({
        type: 'smallint',
        insert: true,
        update: false,
        default: 0
    })
    readonly weight: number;

    @Column({
        type: 'mediumint',
        insert: true,
        update: false,
        default: 0
    })
    readonly order: number;

    @Column({
        name: 'image_color',
        type: 'varchar',
        length: 32,
        insert: true,
        update: false
    })
    readonly imageColor: string;

    @ManyToOne(() => RegionEntity, (region) => region.pokemons)
    @JoinColumn({
        name: 'region_id'
    })
    readonly region: RegionEntity;

    @OneToMany(
        () => PokemonEvolutionEntity,
        (pokemonEvolution) => pokemonEvolution.pokemon
    )
    readonly pokemonEvolutions: PokemonEvolutionEntity[];

    @OneToMany(
        () => FlavorTextEntryEntity,
        (flavorTextEntry) => flavorTextEntry.pokemon
    )
    readonly flavorTextEntries: FlavorTextEntryEntity[];

    @OneToMany(() => GeneraEntity, (genera) => genera.pokemon)
    readonly generas: GeneraEntity[];

    @OneToMany(
        () => PokemonGameImageEntity,
        (pokemonGameImage) => pokemonGameImage.pokemon
    )
    readonly pokemonGameImages: PokemonGameImageEntity[];

    @OneToMany(
        () => PokemonFootmarkImage,
        (pokemonFootmarkImage) => pokemonFootmarkImage.pokemon
    )
    readonly pokemonFootmarkImages: PokemonFootmarkImage[];

    @OneToMany(
        () => PokemonWarkImage,
        (pokemonWarkImage) => pokemonWarkImage.pokemon
    )
    readonly pokemonWarkImages: PokemonWarkImage[];

    @OneToMany(() => PokemonNameEntity, (pokemonName) => pokemonName.pokemon)
    readonly pokemonNames: PokemonNameEntity[];

    @OneToOne(() => StatusEntity, (status) => status.pokemon)
    readonly status: StatusEntity;

    @OneToMany(() => PokemonTypeEntity, (pokemonType) => pokemonType.pokemon)
    readonly pokemonTypes: PokemonTypeEntity[];

    public refer(): void {
        console.table(this);
    }
}

export default PokemonEntity;
