import { PokemonSearchResponse } from '@t/response-model';

export default interface ISearchPokemonUsecase {
    search(
        languageId: number,
        gameVersionGroupId: number,
        regionIds: number[]
    ): Promise<PokemonSearchResponse[]>;
}
