declare module 'app-request-model' {
    type LangQueryParam = {
        lang?: string;
    };

    export type SearchAllPokemonQueryParam = LangQueryParam & {
        game?: string;
        regions?: string[];
        offset?: number;
        limit?: number;
    };

    export type SearchOnePokemonQueryParam = LangQueryParam & {
        game?: string;
    };

    export type GameVersionGroupQueryParam = LangQueryParam & {
        supported?: string;
    };

    export type RegionQueryParam = LangQueryParam;
}
