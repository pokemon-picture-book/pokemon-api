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
        return !!languageName && !!gameVersionGroupAlias && !!regionNames.length
            ? [
                  {
                      id: 1,
                      name: 'name',
                      imageColor: 'imageColor',
                      gameImagePaths: ['gameImagePath'],
                      imagePaths: ['imagePath'],
                      types: ['type']
                  }
              ]
            : [];
    }
}
