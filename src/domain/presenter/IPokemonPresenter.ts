import Pokemons from '@/domain/entity/Pokemons';
import PokemonSearchResponse from '@/usecase/dto/model/PokemonSearchResponse';

export default interface IPokemonPresenter {
    mappingAll(pokemons: Pokemons[]): PokemonSearchResponse[];
}
