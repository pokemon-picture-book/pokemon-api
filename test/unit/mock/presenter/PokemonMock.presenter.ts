import { injectable } from 'inversify';
import IPokemonPresenter from '@/02-application/presenter/IPokemon.presenter';
import PokemonEntity from '@/01-enterprise/entity/Pokemon.entity';
import {
    SearchOnePokemonResponse,
    SearchAllPokemonResponse,
    SearchAllPokemonResponseData,
} from 'app-response-model';

@injectable()
export default class PokemonMockPresenter implements IPokemonPresenter {
    public toSearchAllPokemonResponse(
        hits: number,
        pokemons: PokemonEntity[]
    ): Promise<SearchAllPokemonResponse> {
        return Promise.resolve({
            hits,
            data: pokemons.map<SearchAllPokemonResponseData>(() => {
                return {
                    id: 1,
                    imageColor: 'imageColor',
                    name: 'name',
                    gameImagePath: 'gameImagePathMain',
                    types: [{ code: 'code', name: 'name' }],
                };
            }),
        });
    }

    toSearchOnePokemonResponse(
        _: PokemonEntity
    ): Promise<SearchOnePokemonResponse> {
        throw new Error('Method not implemented.');
    }
}
