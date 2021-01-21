import GameVersionGroupController from '@/controller/GameVersionGroup.controller';
import PokemonController from '@/controller/Pokemon.controller';
import RegionController from '@/controller/Region.controller';
import IGameVersionGroupPresenter from '@/domain/presenter/IGameVersionGroup.presenter';
import IPokemonPresenter from '@/domain/presenter/IPokemon.presenter';
import IRegionPresenter from '@/domain/presenter/IRegion.presenter';
import IGameVersionGroupRepository from '@/domain/repository/IGameVersionGroup.repository';
import ILanguageRepository from '@/domain/repository/ILanguage.repository';
import IPokemonRepository from '@/domain/repository/IPokemon.repository';
import IRegionRepository from '@/domain/repository/IRegion.repository';
import GameVersionGroupInteractor from '@/interactor/GameVersionGroup.interactor';
import RegionInteractor from '@/interactor/Region.interactor';
import SearchPokemonInteractor from '@/interactor/SearchPokemon.interactor';
import IGameVersionGroupUsecase from '@/usecase/IGameVersionGroup.usecase';
import IRegionUsecase from '@/usecase/IRegion.usecase';
import ISearchPokemonUsecase from '@/usecase/ISearchPokemon.usecase';
import GameVersionGroupMockRepository from '@test/unit/mock/infrastructure/repository/GameVersionGroupMock.repository';
import LanguageMockRepository from '@test/unit/mock/infrastructure/repository/LanguageMock.repository';
import PokemonMockRepository from '@test/unit/mock/infrastructure/repository/PokemonMock.repository';
import RegionMockRepository from '@test/unit/mock/infrastructure/repository/RegionMock.repository';
import GameVersionGroupMockInteractor from '@test/unit/mock/interactor/GameVersionGroupMock.interactor';
import SearchPokemonMockInteractor from '@test/unit/mock/interactor/SearchPokemonMock.interactor';
import GameVersionGroupMockPresenter from '@test/unit/mock/presenter/GameVersionGroupMock.presenter';
import PokemonMockPresenter from '@test/unit/mock/presenter/PokemonMock.presenter';
import TYPES from '@test/unit/registory/inversify.types';
import { Container } from 'inversify';
import RegionMockInteractor from '../mock/interactor/RegionMock.interactor';
import RegionMockPresenter from '../mock/presenter/RegionMock.presenter';

export const interactorContainer = (() => {
    const container: Readonly<Container> = new Container();

    container
        .bind<IPokemonPresenter>(TYPES.IPokemonPresenter)
        .to(PokemonMockPresenter);
    container
        .bind<IGameVersionGroupPresenter>(TYPES.IGameVersionGroupPresenter)
        .to(GameVersionGroupMockPresenter);
    container
        .bind<IRegionPresenter>(TYPES.IRegionPresenter)
        .to(RegionMockPresenter);
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
        .to(GameVersionGroupInteractor);
    container
        .bind<IRegionUsecase>(TYPES.IRegionUsecase)
        .to(RegionInteractor)
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
        .to(GameVersionGroupMockInteractor);
    container
        .bind<RegionController>(TYPES.RegionController)
        .to(RegionController);
    container
        .bind<IRegionUsecase>(TYPES.IRegionUsecase)
        .to(RegionMockInteractor)
        .inSingletonScope();

    return container;
})();

export default {};
