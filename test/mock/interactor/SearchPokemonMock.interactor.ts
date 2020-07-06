import ISearchPokemonUsecase from '@/usecase/ISearchPokemon.usecase';
import { PokemonSearchResponse } from '@t/response-model';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export default class SearchPokemonMockInteractor
    implements ISearchPokemonUsecase {
    public async search(
        languageName: string,
        gameVersionGroupAlias: string,
        regionNames: string[]
    ): Promise<PokemonSearchResponse[]> {
        if (!(languageName && gameVersionGroupAlias && regionNames)) {
            return [];
        }

        return [
            {
                id: 1,
                imageColor: 'green',
                name: 'wataru',
                gameImagePaths: ['./game/image/path.png'],
                imagePaths: ['./image/path.png'],
                types: ['normal']
            }
        ];
    }
}
