import SearchPokemonInteractor from '@/interactor/SearchPokemon.interactor';
import { interactorContainer } from '@test/unit/registory/inversify.config';
import TYPES from '@test/unit/registory/inversify.types';
import ISearchPokemonUsecase from '@/usecase/ISearchPokemon.usecase';

describe('Unit test for SearchPokemon interactor', () => {
    const usecase: ISearchPokemonUsecase = interactorContainer.get<SearchPokemonInteractor>(
        TYPES.ISearchPokemonUsecase
    );

    test('異常: 言語に対し異常なパラメータで call した場合、空配列であるか', async (done) => {
        const pokemons = await usecase.search(
            {
                languageName: 'xxxxx',
                gameVersionGroupAlias: '',
                regionNames: [''],
            },
            {
                offset: 1,
                limit: 1,
            }
        );
        expect(pokemons.hits).toBe(0);
        expect(pokemons.data.length).toBe(0);
        done();
    });

    test('異常: ゲーム・地域に対し異常なパラメータで call した場合、空配列であるか', async (done) => {
        const pokemons = await usecase.search(
            {
                languageName: '',
                gameVersionGroupAlias: '',
                regionNames: [''],
            },
            {
                offset: 1,
                limit: 1,
            }
        );
        expect(pokemons.hits).toBe(0);
        expect(pokemons.data.length).toBe(0);
        done();
    });
});
