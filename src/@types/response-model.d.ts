declare module 'app-response-model' {
    import {
        Pokemon,
        PokemonGameImage,
        PokemonImage,
        PokemonName,
        Language,
        GameVersionGroup,
        GameVersionName,
        Type,
        TypeName,
        Region,
        RegionName,
    } from 'app-entity';

    export type PokemonSearchResponse = Pick<Pokemon, 'id' | 'imageColor'> &
        Pick<PokemonName, 'name'> & {
            gameImagePath: {
                mainPath: PokemonGameImage['path'];
                otherPaths: PokemonGameImage['path'][];
            };
            imagePaths: PokemonImage['path'][];
            types: {
                code: Type['name'];
                name: TypeName['name'];
            }[];
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
