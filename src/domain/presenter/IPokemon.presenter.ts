import PokemonEntity from '@/domain/entity/Pokemon.entity';
import { PokemonSearchResponse } from '@t/response-model';

export default interface IPokemonPresenter {
    toPokemonSearchResponse(pokemons: PokemonEntity[]): PokemonSearchResponse[];
}
