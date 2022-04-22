import PokemonEntity from '@/01-enterprise/entity/Pokemon.entity';
import {
    SearchOnePokemonResponse,
    SearchAllPokemonResponse,
    SearchSimplePokemonResponse,
    SearchOnePokemonStatusResponse
} from 'app-response-model';

export default interface IPokemonPresenter {
    toSearchAllPokemonResponse(
        hits: number,
        pokemons: PokemonEntity[]
    ): Promise<SearchAllPokemonResponse>;

    toSearchSimplePokemonResponse(
        pokemons: PokemonEntity[]
    ): SearchSimplePokemonResponse;

    toSearchOnePokemonResponse(
        pokemon: PokemonEntity,
        prevNextIdData: { prevId: number; nextId: number }
    ): Promise<SearchOnePokemonResponse>;

    toSearchOnePokemonStatusResponse(
        pokemon: PokemonEntity
    ): SearchOnePokemonStatusResponse;
}
