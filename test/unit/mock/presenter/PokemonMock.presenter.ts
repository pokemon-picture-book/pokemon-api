import { injectable } from 'inversify';
import IPokemonPresenter from '@/02-application/presenter/IPokemon.presenter';
import PokemonEntity from '@/01-enterprise/entity/Pokemon.entity';
import {
    PokemonSearchResponse,
    PokemonSearchResponseData,
} from 'app-response-model';

@injectable()
export default class PokemonMockPresenter implements IPokemonPresenter {
    public toPokemonSearchResponse(
        hits: number,
        pokemons: PokemonEntity[]
    ): Promise<PokemonSearchResponse> {
        return Promise.resolve({
            hits,
            data: pokemons.map<PokemonSearchResponseData>(() => {
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
}
