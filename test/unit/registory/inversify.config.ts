import IPokemonPresenter from '@/domain/presenter/IPokemon.presenter';
import IGameVersionGroupRepository from '@/domain/repository/IGameVersionGroup.repository';
import ILanguageRepository from '@/domain/repository/ILanguage.repository';
import IPokemonRepository from '@/domain/repository/IPokemon.repository';
import IRegionRepository from '@/domain/repository/IRegion.repository';
import SearchPokemonInteractor from '@/interactor/SearchPokemon.interactor';
import ISearchPokemonUsecase from '@/usecase/ISearchPokemon.usecase';
import TEST_TYPES from '@test/unit/registory/inversify.types';
import { Container } from 'inversify';
import GameVersionGroupMockRepository from '@test/unit/mock/infrastructure/repository/GameVersionGroupMock.repository';
import LanguageMockRepository from '@test/unit/mock/infrastructure/repository/LanguageMock.repository';
import PokemonMockRepository from '@test/unit/mock/infrastructure/repository/PokemonMock.repository';
import RegionMockRepository from '@test/unit/mock/infrastructure/repository/RegionMock.repository';
import PokemonMockPresenter from '@test/unit/mock/presenter/PokemonMock.presenter';

export const interactorContainer = (() => {
    const container: Readonly<Container> = new Container();

    container
        .bind<IPokemonPresenter>(TEST_TYPES.IPokemonPresenter)
        .to(PokemonMockPresenter);
    container
        .bind<IPokemonRepository>(TEST_TYPES.IPokemonRepository)
        .to(PokemonMockRepository);
    container
        .bind<ILanguageRepository>(TEST_TYPES.ILanguageRepository)
        .to(LanguageMockRepository);
    container
        .bind<IGameVersionGroupRepository>(
            TEST_TYPES.IGameVersionGroupRepository
        )
        .to(GameVersionGroupMockRepository);
    container
        .bind<IRegionRepository>(TEST_TYPES.IRegionRepository)
        .to(RegionMockRepository);
    container
        .bind<ISearchPokemonUsecase>(TEST_TYPES.ISearchPokemonUsecase)
        .to(SearchPokemonInteractor)
        .inSingletonScope();

    return container;
})();

export default {};
