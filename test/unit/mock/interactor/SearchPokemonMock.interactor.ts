import ISearchPokemonUsecase from '@/02-application/usecase/ISearchPokemon.usecase';
import {
    SearchAllPokemonResponse,
    SearchOnePokemonResponse,
    SearchOnePokemonStatusResponse,
    SearchSimplePokemonResponse
} from 'app-response-model';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export default class SearchPokemonMockInteractor
    implements ISearchPokemonUsecase {
    public async searchAll(
        requestParam: {
            languageName?: string | undefined;
            gameVersionGroupAlias?: string | undefined;
            regionNames?: string[] | undefined;
        },
        _: { offset: number | undefined; limit: number | undefined }
    ): Promise<SearchAllPokemonResponse> {
        const {
            languageName,
            gameVersionGroupAlias,
            regionNames
        } = requestParam;
        return languageName === 'en' &&
            gameVersionGroupAlias === 'rgby' &&
            regionNames &&
            regionNames.length
            ? {
                  hits: 1,
                  data: [
                      {
                          id: 1,
                          name: 'name',
                          imageColor: 'imageColor',
                          gameImagePath: 'gameImagePathMain',
                          types: [{ code: 'typeCode', name: 'typeName' }]
                      }
                  ]
              }
            : {
                  hits: 0,
                  data: []
              };
    }

    searchSimpleData(): Promise<SearchSimplePokemonResponse> {
        throw new Error('Method not implemented.');
    }

    searchOne(_: {
        id: number;
        languageName?: string;
        gameVersionGroupAlias?: string;
    }): Promise<SearchOnePokemonResponse | null> {
        throw new Error('Method not implemented.');
    }

    searchOneStatus(): Promise<SearchOnePokemonStatusResponse | null> {
        throw new Error('Method not implemented.');
    }
}
