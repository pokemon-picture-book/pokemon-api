import PokemonEntity from '@/01-enterprise/entity/Pokemon.entity';
import {
    SearchOnePokemonResponse,
    SearchAllPokemonResponse,
} from 'app-response-model';

export default interface IPokemonPresenter {
    toSearchAllPokemonResponse(
        hits: number,
        pokemons: PokemonEntity[]
    ): Promise<SearchAllPokemonResponse>;

    toSearchOnePokemonResponse(
        pokemon: PokemonEntity
    ): Promise<SearchOnePokemonResponse>;
}
