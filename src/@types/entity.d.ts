declare module 'app-entity' {
    import EvolutionEntity from '@/domain/entity/Evolution.entity';
    import FlavorTextEntryEntity from '@/domain/entity/FlavorTextEntry.entity';
    import GameVersionEntity from '@/domain/entity/GameVersion.entity';
    import GameVersionGroupEntity from '@/domain/entity/GameVersionGroup.entity';
    import GameVersionNameEntity from '@/domain/entity/GameVersionName.entity';
    import GeneraEntity from '@/domain/entity/Genera.entity';
    import LanguageEntity from '@/domain/entity/Language.entity';
    import PokemonEntity from '@/domain/entity/Pokemon.entity';
    import PokemonEvolutionEntity from '@/domain/entity/PokemonEvolution.entity';
    import PokemonGameImageEntity from '@/domain/entity/PokemonGameImage.entity';
    import PokemonImageEntity from '@/domain/entity/PokemonImage.entity';
    import PokemonNameEntity from '@/domain/entity/PokemonName.entity';
    import PokemonTypeEntity from '@/domain/entity/PokemonType.entity';
    import RegionEntity from '@/domain/entity/Region.entity';
    import RegionNameEntity from '@/domain/entity/RegionName.entity';
    import StatusEntity from '@/domain/entity/Status.entity';
    import TypeEntity from '@/domain/entity/Type.entity';
    import TypeNameEntity from '@/domain/entity/TypeName.entity';

    export type Evolution = InstanceType<typeof EvolutionEntity>;
    export type FlavorTextEntry = InstanceType<typeof FlavorTextEntryEntity>;
    export type GameVersion = InstanceType<typeof GameVersionEntity>;
    export type GameVersionGroup = InstanceType<typeof GameVersionGroupEntity>;
    export type GameVersionName = InstanceType<typeof GameVersionNameEntity>;
    export type Genera = InstanceType<typeof GeneraEntity>;
    export type Language = InstanceType<typeof LanguageEntity>;
    export type Pokemon = InstanceType<typeof PokemonEntity>;
    export type PokemonEvolution = InstanceType<typeof PokemonEvolutionEntity>;
    export type PokemonGameImage = InstanceType<typeof PokemonGameImageEntity>;
    export type PokemonImage = InstanceType<typeof PokemonImageEntity>;
    export type PokemonName = InstanceType<typeof PokemonNameEntity>;
    export type PokemonType = InstanceType<typeof PokemonTypeEntity>;
    export type Region = InstanceType<typeof RegionEntity>;
    export type RegionName = InstanceType<typeof RegionNameEntity>;
    export type Status = InstanceType<typeof StatusEntity>;
    export type Type = InstanceType<typeof TypeEntity>;
    export type TypeName = InstanceType<typeof TypeNameEntity>;
}
