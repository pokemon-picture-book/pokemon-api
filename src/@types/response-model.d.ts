declare module 'app-response-model' {
    import {
        Pokemon,
        PokemonGameImage,
        PokemonImage,
        PokemonName,
        Language,
        GameVersionGroup,
        GameVersionName,
        TypeName,
        Region,
        RegionName,
    } from 'app-entity';

    export type PokemonSearchResponse = Pick<Pokemon, 'id' | 'imageColor'> &
        Pick<PokemonName, 'name'> & {
            gameImagePaths: PokemonGameImage['path'][];
            imagePaths: PokemonImage['path'][];
            types: TypeName['name'][];
        };

    export type GameVersionGroupResponse = Pick<
        GameVersionGroup,
        'id' | 'alias'
    > &
        Pick<GameVersionName, 'name'>;

    export type RegionResponse = Pick<Region, 'id' | 'name'> & {
        displayName: RegionName['name'];
    };

    export type LanguageResponse = Pick<Language, 'id' | 'name' | 'labelName'>;
}
