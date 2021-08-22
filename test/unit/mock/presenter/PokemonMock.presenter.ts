import { injectable } from 'inversify';
import IPokemonPresenter from '@/domain/presenter/IPokemon.presenter';
import PokemonEntity from '@/domain/entity/Pokemon.entity';
import { PokemonSearchResponse } from 'app-response-model';

@injectable()
export default class PokemonMockPresenter implements IPokemonPresenter {
    public toPokemonSearchResponse(
        hits: number,
        pokemons: PokemonEntity[]
    ): PokemonSearchResponse {
        return {
            hits,
            data: pokemons.map<PokemonSearchResponse['data'][number]>(() => {
                return {
                    id: 1,
                    imageColor: 'imageColor',
                    name: 'name',
                    gameImagePath: {
                        mainPath: 'gameImagePathMain',
                        otherPaths: ['gameImagePathSub'],
                    },
                    types: [{ code: 'code', name: 'name' }],
                };
            }),
        };
    }
}
