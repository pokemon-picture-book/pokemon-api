import SearchPokemonInteractor from '@/02-application/usecase/interactor/SearchPokemon.interactor';
import ISearchPokemonUsecase from '@/02-application/usecase/ISearchPokemon.usecase';
import { interactorContainer } from '@test/unit/registory/inversify.config';
import TYPES from '@test/unit/registory/inversify.types';
import { getSearchOneContainer } from './mock/search-pokemon.mock';

describe('Unit test for SearchPokemon interactor', () => {
    const usecase: ISearchPokemonUsecase = interactorContainer.get<SearchPokemonInteractor>(
        TYPES.ISearchPokemonUsecase
    );

    test('異常: 言語に対し異常なパラメータで call した場合、空配列であるか', async (done) => {
        const pokemons = await usecase.searchAll(
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
        const pokemons = await usecase.searchAll(
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

    describe('usecase.searchOne', () => {
        const searchOneUsecase: ISearchPokemonUsecase = getSearchOneContainer().get<SearchPokemonInteractor>(
            TYPES.ISearchPokemonUsecase
        );

        test('異常: 言語に異常なパラメータで call した場合、null であるか', async (done) => {
            const pokemon = await searchOneUsecase.searchOne({
                id: 1,
                languageName: 'xxxxx',
                gameVersionGroupAlias: 'rgby',
            });
            expect(pokemon).toBeNull();
            done();
        });

        test('異常: ID に異常なパラメータで call した場合、null であるか', async (done) => {
            const pokemon = await searchOneUsecase.searchOne({
                id: 0,
                languageName: 'en',
                gameVersionGroupAlias: 'rgby',
                regionNames: ['kanto'],
            });
            expect(pokemon).toBeNull();
            done();
        });
    });
});
