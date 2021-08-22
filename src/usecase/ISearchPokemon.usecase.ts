import { PokemonSearchResponse } from 'app-response-model';

export default interface ISearchPokemonUsecase {
    search(
        requestParam: {
            languageName?: string;
            gameVersionGroupAlias?: string;
            regionNames?: string[];
        },
        pageParam: {
            offset: number;
            limit: number;
        }
    ): Promise<PokemonSearchResponse>;
}
