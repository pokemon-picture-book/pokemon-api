import { injectable } from 'inversify';
import IPokemonPresenter from '@/domain/presenter/IPokemon.presenter';
import PokemonEntity from '@/domain/entity/Pokemon.entity';
import { PokemonSearchResponse } from 'app-response-model';

@injectable()
export default class PokemonMockPresenter implements IPokemonPresenter {
    public toPokemonSearchResponse(
        pokemons: PokemonEntity[]
    ): PokemonSearchResponse[] {
        return pokemons.map(
            (): PokemonSearchResponse => {
                return {
                    id: 1,
                    imageColor: 'imageColor',
                    name: 'name',
                    gameImagePaths: ['gameImagePath'],
                    imagePaths: ['imagePath'],
                    types: [{ code: 'code', name: 'name' }],
                };
            }
        );
    }
}
