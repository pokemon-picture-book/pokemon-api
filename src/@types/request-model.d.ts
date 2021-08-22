declare module 'app-request-model' {
    type LangQueryParam = {
        lang?: string;
    };

    export type SearchPokemonQueryParam = LangQueryParam & {
        game?: string;
        regions?: string[];
        offset?: number;
        limit?: number;
    };

    export type GameVersionGroupQueryParam = LangQueryParam & {
        supported?: string;
    };

    export type RegionQueryParam = LangQueryParam;
}
