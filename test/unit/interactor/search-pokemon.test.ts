import SearchPokemonInteractor from '@/interactor/SearchPokemon.interactor';
import { interactorContainer } from '@test/unit/registory/inversify.config';
import TYPES from '@test/unit/registory/inversify.types';
import ISearchPokemonUsecase from '@/usecase/ISearchPokemon.usecase';

describe('Unit test for SearchPokemon interactor', () => {
    const usecase: ISearchPokemonUsecase = interactorContainer.get<SearchPokemonInteractor>(
        TYPES.ISearchPokemonUsecase
    );

    test('正常: 正常なパラメータで call した場合、空配列ではないか', async (done) => {
        const pokemons = await usecase.search('test1', 'test2', ['test3']);
        expect(pokemons.length).not.toBe(0);
        done();
    });

    test('異常: 異常なパラメータで call した場合、空配列であるか', async (done) => {
        const pokemons = await usecase.search('', '', ['']);
        expect(pokemons.length).toBe(0);
        done();
    });
});
