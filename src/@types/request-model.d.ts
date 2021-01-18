declare module 'app-request-model' {
    export type SearchPokemonQueryParam = {
        lang?: string;
        game?: string;
        regions?: string[];
    };

    export type GameVersionGroupQueryParam = {
        lang?: string;
        supported?: string;
    };

    export type RegionQueryParam = {
        lang?: string;
    };
}
