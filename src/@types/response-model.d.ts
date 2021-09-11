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

    export type PokemonSearchResponseData = Pick<Pokemon, 'id' | 'imageColor'> &
        Pick<PokemonName, 'name'> & {
            gameImagePath: {
                mainPath: PokemonGameImage['path'];
                otherPaths: PokemonGameImage['path'][];
            };
            types: {
                code: Type['name'];
                name: TypeName['name'];
            }[];
        };

    export type PokemonSearchResponse = {
        hits: number;
        data: PokemonSearchResponseData[];
    };

    export type GameVersionGroupResponse = Pick<
        GameVersionGroup,
        'id' | 'alias'
    > &
        Pick<GameVersionName, 'name'> & {
            relatedRegions: Pick<Region, 'id' | 'name'>[];
        };

    export type RegionResponse = Pick<Region, 'id' | 'name'> & {
        displayName: RegionName['name'];
        relatedGameVersionGroups: Pick<GameVersionGroup, 'id', 'alias'>[];
    };

    export type LanguageResponse = Pick<Language, 'id' | 'name' | 'labelName'>;
}
