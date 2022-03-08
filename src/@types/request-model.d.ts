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

    export type SearchSimpleAllPokemonQueryParam = LangQueryParam;

    export type SearchOnePokemonQueryParam = LangQueryParam & {
        game?: string;
        regions?: string[];
    };

    export type SearchOnePokemonStatusQueryParam = LangQueryParam;

    export type GameVersionGroupQueryParam = LangQueryParam & {
        supported?: string;
    };

    export type RegionQueryParam = LangQueryParam;
}
