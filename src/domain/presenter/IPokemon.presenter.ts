import PokemonEntity from '@/domain/entity/Pokemon.entity';
import { PokemonSearchResponse } from 'app-response-model';

export default interface IPokemonPresenter {
    toPokemonSearchResponse(
        hits: number,
        pokemons: PokemonEntity[]
    ): Promise<PokemonSearchResponse>;
}
