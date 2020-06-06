import PokemonSearchResponse from '@/usecase/dto/model/PokemonSearchResponse';

export default interface ISearchPokemonUsecase {
    search(): Promise<PokemonSearchResponse[]>;
}
