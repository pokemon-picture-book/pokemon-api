import { PokemonSearchResponse } from 'app-response-model';

export default interface ISearchPokemonUsecase {
    search(
        languageName: string,
        gameVersionGroupAlias: string,
        regionNames: string[]
    ): Promise<PokemonSearchResponse[]>;
}
