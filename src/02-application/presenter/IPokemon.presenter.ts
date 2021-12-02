import PokemonEntity from '@/01-enterprise/entity/Pokemon.entity';
import { PokemonSearchResponse } from 'app-response-model';

export default interface IPokemonPresenter {
    toPokemonSearchResponse(
        hits: number,
        pokemons: PokemonEntity[]
    ): Promise<PokemonSearchResponse>;
}
