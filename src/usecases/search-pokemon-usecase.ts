import Pokemons from '@/domain/entities/Pokemons';

export default interface ISearchPokemonUsecase {
    search(): Promise<Pokemons[]>;
}
