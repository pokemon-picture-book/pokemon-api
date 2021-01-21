declare module 'app-request-model' {
    type LangQueryParam = {
        lang?: string;
    };

    export type SearchPokemonQueryParam = LangQueryParam & {
        game?: string;
        regions?: string[];
    };

    export type GameVersionGroupQueryParam = LangQueryParam & {
        supported?: string;
    };

    export type RegionQueryParam = LangQueryParam & {};
}
