declare module 'app-entity' {
    import EvolutionEntity from '@/01-enterprise/entity/Evolution.entity';
    import FlavorTextEntryEntity from '@/01-enterprise/entity/FlavorTextEntry.entity';
    import GameVersionEntity from '@/01-enterprise/entity/GameVersion.entity';
    import GameVersionGroupEntity from '@/01-enterprise/entity/GameVersionGroup.entity';
    import GameVersionGroupRegionEntity from '@/01-enterprise/entity/GameVersionGroupRegion.entity';
    import GameVersionNameEntity from '@/01-enterprise/entity/GameVersionName.entity';
    import GeneraEntity from '@/01-enterprise/entity/Genera.entity';
    import LanguageEntity from '@/01-enterprise/entity/Language.entity';
    import PokemonEntity from '@/01-enterprise/entity/Pokemon.entity';
    import PokemonEvolutionEntity from '@/01-enterprise/entity/PokemonEvolution.entity';
    import PokemonGameImageEntity from '@/01-enterprise/entity/PokemonGameImage.entity';
    import PokemonFootmarkImageEntity from '@/01-enterprise/entity/PokemonFootmarkImage.entity';
    import PokemonWarkImageEntity from '@/01-enterprise/entity/PokemonWarkImage.entity';
    import PokemonNameEntity from '@/01-enterprise/entity/PokemonName.entity';
    import PokemonTypeEntity from '@/01-enterprise/entity/PokemonType.entity';
    import RegionEntity from '@/01-enterprise/entity/Region.entity';
    import RegionNameEntity from '@/01-enterprise/entity/RegionName.entity';
    import StatusEntity from '@/01-enterprise/entity/Status.entity';
    import TypeEntity from '@/01-enterprise/entity/Type.entity';
    import TypeNameEntity from '@/01-enterprise/entity/TypeName.entity';

    export type Evolution = InstanceType<typeof EvolutionEntity>;
    export type FlavorTextEntry = InstanceType<typeof FlavorTextEntryEntity>;
    export type GameVersion = InstanceType<typeof GameVersionEntity>;
    export type GameVersionGroup = InstanceType<typeof GameVersionGroupEntity>;
    export type GameVersionGroupRegion = InstanceType<
        typeof GameVersionGroupRegionEntity
    >;
    export type GameVersionName = InstanceType<typeof GameVersionNameEntity>;
    export type Genera = InstanceType<typeof GeneraEntity>;
    export type Language = InstanceType<typeof LanguageEntity>;
    export type Pokemon = InstanceType<typeof PokemonEntity>;
    export type PokemonEvolution = InstanceType<typeof PokemonEvolutionEntity>;
    export type PokemonGameImage = InstanceType<typeof PokemonGameImageEntity>;
    export type PokemonFootmarkImage = InstanceType<
        typeof PokemonFootmarkImageEntity
    >;
    export type PokemonWarkImage = InstanceType<typeof PokemonWarkImageEntity>;
    export type PokemonName = InstanceType<typeof PokemonNameEntity>;
    export type PokemonType = InstanceType<typeof PokemonTypeEntity>;
    export type Region = InstanceType<typeof RegionEntity>;
    export type RegionName = InstanceType<typeof RegionNameEntity>;
    export type Status = InstanceType<typeof StatusEntity>;
    export type Type = InstanceType<typeof TypeEntity>;
    export type TypeName = InstanceType<typeof TypeNameEntity>;
}
