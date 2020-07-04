import { PokemonSearchResponse } from '@t/response-model';

export default interface ISearchPokemonUsecase {
    search(
        languageName: string,
        gameVersionGroupAlias: string,
        regionNames: string[]
    ): Promise<PokemonSearchResponse[]>;
}
