// controller
import PokemonController from '@/controller/Pokemon.controller';
import GameVersionGroupController from '@/controller/GameVersionGroup.controller';
import RegionController from '@/controller/Region.controller';

// presenter
import IPokemonPresenter from '@/domain/presenter/IPokemon.presenter';
import IGameVersionGroupPresenter from '@/domain/presenter/IGameVersionGroup.presenter';
import IRegionPresenter from '@/domain/presenter/IRegion.presenter';
import PokemonPresenter from '@/presenter/Pokemon.presenter';
import GameVersionGroupPresenter from '@/presenter/GameVersionGroup.presenter';
import RegionPresenter from '@/presenter/Region.presenter';

// repository
import IGameVersionGroupRepository from '@/domain/repository/IGameVersionGroup.repository';
import ILanguageRepository from '@/domain/repository/ILanguage.repository';
import IPokemonRepository from '@/domain/repository/IPokemon.repository';
import IRegionRepository from '@/domain/repository/IRegion.repository';
import GameVersionGroupRepository from '@/infrastructure/repository/GameVersionGroup.repository';
import LanguageRepository from '@/infrastructure/repository/Language.repository';
import PokemonRepository from '@/infrastructure/repository/Pokemon.repository';
import RegionRepository from '@/infrastructure/repository/Region.repository';

// usecase
import ISearchPokemonUsecase from '@/usecase/ISearchPokemon.usecase';
import IGameVersionGroupUsecase from '@/usecase/IGameVersionGroup.usecase';
import IRegionUsecase from '@/usecase/IRegion.usecase';
import SearchPokemonInteractor from '@/interactor/SearchPokemon.interactor';
import GameVersionGroupInteractor from '@/interactor/GameVersionGroup.interactor';
import RegionInteractor from '@/interactor/Region.interactor';

import TYPES from '@/registory/inversify.types';
import { Container } from 'inversify';

export default (() => {
    const container: Readonly<Container> = new Container();

    container
        .bind<IPokemonPresenter>(TYPES.IPokemonPresenter)
        .to(PokemonPresenter);
    container
        .bind<IGameVersionGroupPresenter>(TYPES.IGameVersionGroupPresenter)
        .to(GameVersionGroupPresenter);
    container
        .bind<IRegionPresenter>(TYPES.IRegionPresenter)
        .to(RegionPresenter);
    container
        .bind<IPokemonRepository>(TYPES.IPokemonRepository)
        .to(PokemonRepository);
    container
        .bind<ILanguageRepository>(TYPES.ILanguageRepository)
        .to(LanguageRepository);
    container
        .bind<IGameVersionGroupRepository>(TYPES.IGameVersionGroupRepository)
        .to(GameVersionGroupRepository);
    container
        .bind<IRegionRepository>(TYPES.IRegionRepository)
        .to(RegionRepository);
    container
        .bind<ISearchPokemonUsecase>(TYPES.ISearchPokemonUsecase)
        .to(SearchPokemonInteractor)
        .inSingletonScope();
    container
        .bind<PokemonController>(TYPES.PokemonController)
        .to(PokemonController);
    container
        .bind<GameVersionGroupController>(TYPES.GameVersionGroupController)
        .to(GameVersionGroupController);
    container
        .bind<RegionController>(TYPES.RegionController)
        .to(RegionController);
    container
        .bind<IGameVersionGroupUsecase>(TYPES.IGameVersionGroupUsecase)
        .to(GameVersionGroupInteractor)
        .inSingletonScope();
    container
        .bind<IRegionUsecase>(TYPES.IRegionUsecase)
        .to(RegionInteractor)
        .inSingletonScope();
    return container;
})();
