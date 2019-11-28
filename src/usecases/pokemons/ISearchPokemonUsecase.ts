import PokemonSearchResponse from '@/usecases/dto/models/PokemonSearchResponse';

export default interface ISearchPokemonUsecase {
    search(): Promise<PokemonSearchResponse[]>;
}
