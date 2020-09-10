import PokemonController from '@/controller/Pokemon.controller';
import GameVersionGroupController from '@/controller/GameVersionGroup.controller';
import IPokemonPresenter from '@/domain/presenter/IPokemon.presenter';
import IGameVersionGroupPresenter from '@/domain/presenter/IGameVersionGroup.presenter';
import ILanguageRepository from '@/domain/repository/ILanguage.repository';
import IPokemonRepository from '@/domain/repository/IPokemon.repository';
import IGameVersionGroupRepository from '@/domain/repository/IGameVersionGroup.repository';
import IRegionRepository from '@/domain/repository/IRegion.repository';
import SearchPokemonInteractor from '@/interactor/SearchPokemon.interactor';
import GameVersionGroupInteractor from '@/interactor/GameVersionGroup.interactor';
import ISearchPokemonUsecase from '@/usecase/ISearchPokemon.usecase';
import IGameVersionGroupUsecase from '@/usecase/IGameVersionGroup.usecase';
import LanguageMockRepository from '@test/unit/mock/infrastructure/repository/LanguageMock.repository';
import PokemonMockRepository from '@test/unit/mock/infrastructure/repository/PokemonMock.repository';
import RegionMockRepository from '@test/unit/mock/infrastructure/repository/RegionMock.repository';
import GameVersionGroupMockRepository from '@test/unit/mock/infrastructure/repository/GameVersionGroupMock.repository';
import SearchPokemonMockInteractor from '@test/unit/mock/interactor/SearchPokemonMock.interactor';
import GameVersionGroupMockInteractor from '@test/unit/mock/interactor/GameVersionGroupMock.interactor';
import PokemonMockPresenter from '@test/unit/mock/presenter/PokemonMock.presenter';
import GameVersionGroupMockPresenter from '@test/unit/mock/presenter/GameVersionGroupMock.presenter';
import TYPES from '@test/unit/registory/inversify.types';
import { Container } from 'inversify';

export const interactorContainer = (() => {
    const container: Readonly<Container> = new Container();

    container
        .bind<IPokemonPresenter>(TYPES.IPokemonPresenter)
        .to(PokemonMockPresenter);
    container
        .bind<IGameVersionGroupPresenter>(TYPES.IGameVersionGroupPresenter)
        .to(GameVersionGroupMockPresenter);
    container
        .bind<IPokemonRepository>(TYPES.IPokemonRepository)
        .to(PokemonMockRepository);
    container
        .bind<ILanguageRepository>(TYPES.ILanguageRepository)
        .to(LanguageMockRepository);
    container
        .bind<IGameVersionGroupRepository>(TYPES.IGameVersionGroupRepository)
        .to(GameVersionGroupMockRepository);
    container
        .bind<IRegionRepository>(TYPES.IRegionRepository)
        .to(RegionMockRepository);
    container
        .bind<ISearchPokemonUsecase>(TYPES.ISearchPokemonUsecase)
        .to(SearchPokemonInteractor)
        .inSingletonScope();
    container
        .bind<IGameVersionGroupUsecase>(TYPES.IGameVersionGroupUsecase)
        .to(GameVersionGroupInteractor)
        .inSingletonScope();

    return container;
})();

export const controllerContainer = (() => {
    const container: Readonly<Container> = new Container();

    container
        .bind<ISearchPokemonUsecase>(TYPES.ISearchPokemonUsecase)
        .to(SearchPokemonMockInteractor)
        .inSingletonScope();
    container
        .bind<PokemonController>(TYPES.PokemonController)
        .to(PokemonController);
    container
        .bind<GameVersionGroupController>(TYPES.GameVersionGroupController)
        .to(GameVersionGroupController);
    container
        .bind<IGameVersionGroupUsecase>(TYPES.IGameVersionGroupUsecase)
        .to(GameVersionGroupMockInteractor)
        .inSingletonScope();

    return container;
})();

export default {};
