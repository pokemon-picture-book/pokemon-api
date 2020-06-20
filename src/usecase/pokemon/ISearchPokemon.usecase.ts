import PokemonSearchResponse from '@/usecase/dto/model/PokemonSearchResponse';

export default interface ISearchPokemonUsecase {
    search(
        languageId: number,
        gameVersionGroupId: number,
        regionIds: number[]
    ): Promise<PokemonSearchResponse[]>;
}
