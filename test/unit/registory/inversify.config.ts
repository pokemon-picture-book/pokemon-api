import GameVersionGroupController from '@/03-interface/controller/GameVersionGroup.controller';
import LanguageController from '@/03-interface/controller/Language.controller';
import PokemonController from '@/03-interface/controller/Pokemon.controller';
import RegionController from '@/03-interface/controller/Region.controller';
import IGameVersionGroupPresenter from '@/02-application/presenter/IGameVersionGroup.presenter';
import ILanguagePresenter from '@/02-application/presenter/ILanguage.presenter';
import IPokemonPresenter from '@/02-application/presenter/IPokemon.presenter';
import IRegionPresenter from '@/02-application/presenter/IRegion.presenter';
import IGameVersionGroupRepository from '@/02-application/repository/IGameVersionGroup.repository';
import ILanguageRepository from '@/02-application/repository/ILanguage.repository';
import IPokemonRepository from '@/02-application/repository/IPokemon.repository';
import IRegionRepository from '@/02-application/repository/IRegion.repository';
import IPokemonEvolutionRepository from '@/02-application/repository/IPokemonEvolution.repository';
import GameVersionGroupInteractor from '@/02-application/usecase/interactor/GameVersionGroup.interactor';
import LanguageInteractor from '@/02-application/usecase/interactor/Language.interactor';
import RegionInteractor from '@/02-application/usecase/interactor/Region.interactor';
import SearchPokemonInteractor from '@/02-application/usecase/interactor/SearchPokemon.interactor';
import IGameVersionGroupUsecase from '@/02-application/usecase/IGameVersionGroup.usecase';
import ILanguageUsecase from '@/02-application/usecase/ILanguage.usecase';
import IRegionUsecase from '@/02-application/usecase/IRegion.usecase';
import ISearchPokemonUsecase from '@/02-application/usecase/ISearchPokemon.usecase';
import GameVersionGroupMockRepository from '@test/unit/mock/infrastructure/repository/GameVersionGroupMock.repository';
import LanguageMockRepository from '@test/unit/mock/infrastructure/repository/LanguageMock.repository';
import PokemonMockRepository from '@test/unit/mock/infrastructure/repository/PokemonMock.repository';
import RegionMockRepository from '@test/unit/mock/infrastructure/repository/RegionMock.repository';
import PokemonEvolutionMockRepository from '@test/unit/mock/infrastructure/repository/PokemonEvolutionMock.repository';
import GameVersionGroupMockInteractor from '@test/unit/mock/interactor/GameVersionGroupMock.interactor';
import RegionMockInteractor from '@test/unit/mock/interactor/RegionMock.interactor';
import SearchPokemonMockInteractor from '@test/unit/mock/interactor/SearchPokemonMock.interactor';
import GameVersionGroupMockPresenter from '@test/unit/mock/presenter/GameVersionGroupMock.presenter';
import LanguageMockPresenter from '@test/unit/mock/presenter/LanguageMock.presenter';
import PokemonMockPresenter from '@test/unit/mock/presenter/PokemonMock.presenter';
import RegionMockPresenter from '@test/unit/mock/presenter/RegionMock.presenter';
import TYPES from '@test/unit/registory/inversify.types';
import { Container } from 'inversify';
import { LanguageMockInteractor } from '../mock/interactor/LanguageMock.interactor';

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
        .bind<ILanguagePresenter>(TYPES.ILanguagePresenter)
        .to(LanguageMockPresenter);
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
        .bind<IPokemonEvolutionRepository>(TYPES.IPokemonEvolutionRepository)
        .to(PokemonEvolutionMockRepository);
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
    container
        .bind<ILanguageUsecase>(TYPES.ILanguageUsecase)
        .to(LanguageInteractor)
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
    container
        .bind<LanguageController>(TYPES.LanguageController)
        .to(LanguageController);
    container
        .bind<ILanguageUsecase>(TYPES.ILanguageUsecase)
        .to(LanguageMockInteractor)
        .inSingletonScope();

    return container;
})();

export default {};
