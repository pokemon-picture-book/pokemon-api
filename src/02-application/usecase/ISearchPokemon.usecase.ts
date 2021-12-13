import {
    SearchAllPokemonResponse,
    SearchOnePokemonResponse,
} from 'app-response-model';

export default interface ISearchPokemonUsecase {
    searchAll(
        requestParam: {
            languageName?: string;
            gameVersionGroupAlias?: string;
            regionNames?: string[];
        },
        pageParam: {
            offset: number;
            limit: number;
        }
    ): Promise<SearchAllPokemonResponse>;

    searchOne(requestParam: {
        id: number;
        languageName?: string;
        gameVersionGroupAlias?: string;
    }): Promise<SearchOnePokemonResponse | null>;
}
