import Pokemon from '@/domain/entity/Pokemon.entity';
import PokemonSearchResponse from '@/usecase/dto/model/PokemonSearchResponse';

export default interface IPokemonPresenter {
    mappingAll(pokemons: Pokemon[]): PokemonSearchResponse[];
}
