import Pokemons from '@/domain/entities/Pokemons';
import PokemonSearchResponse from '@/usecases/dto/models/PokemonSearchResponse';

export default interface IPokemonPresenter {
    mappingAll(pokemons: Pokemons[]): PokemonSearchResponse[];
}
