// controller
import PokemonController from '@/03-interface/controller/Pokemon.controller';
import GameVersionGroupController from '@/03-interface/controller/GameVersionGroup.controller';
import RegionController from '@/03-interface/controller/Region.controller';
import LanguageController from '@/03-interface/controller/Language.controller';

// presenter
import IPokemonPresenter from '@/02-application/presenter/IPokemon.presenter';
import IGameVersionGroupPresenter from '@/02-application/presenter/IGameVersionGroup.presenter';
import IRegionPresenter from '@/02-application/presenter/IRegion.presenter';
import ILanguagePresenter from '@/02-application/presenter/ILanguage.presenter';
import PokemonPresenter from '@/03-interface/presenter/Pokemon.presenter';
import GameVersionGroupPresenter from '@/03-interface/presenter/GameVersionGroup.presenter';
import RegionPresenter from '@/03-interface/presenter/Region.presenter';
import LanguagePresenter from '@/03-interface/presenter/Language.presenter';

// repository
import IGameVersionGroupRepository from '@/02-application/repository/IGameVersionGroup.repository';
import ILanguageRepository from '@/02-application/repository/ILanguage.repository';
import IPokemonRepository from '@/02-application/repository/IPokemon.repository';
import IRegionRepository from '@/02-application/repository/IRegion.repository';
import GameVersionGroupRepository from '@/03-interface/infrastructure/repository/GameVersionGroup.repository';
import LanguageRepository from '@/03-interface/infrastructure/repository/Language.repository';
import PokemonRepository from '@/03-interface/infrastructure/repository/Pokemon.repository';
import RegionRepository from '@/03-interface/infrastructure/repository/Region.repository';

// usecase
import ISearchPokemonUsecase from '@/02-application/usecase/ISearchPokemon.usecase';
import IGameVersionGroupUsecase from '@/02-application/usecase/IGameVersionGroup.usecase';
import IRegionUsecase from '@/02-application/usecase/IRegion.usecase';
import ILanguageUsecase from '@/02-application/usecase/ILanguage.usecase';
import SearchPokemonInteractor from '@/02-application/usecase/interactor/SearchPokemon.interactor';
import GameVersionGroupInteractor from '@/02-application/usecase/interactor/GameVersionGroup.interactor';
import RegionInteractor from '@/02-application/usecase/interactor/Region.interactor';
import LanguageInteractor from '@/02-application/usecase/interactor/Language.interactor';

import TYPES from '@/inversify.types';
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
        .bind<ILanguagePresenter>(TYPES.ILanguagePresenter)
        .to(LanguagePresenter);
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
        .bind<LanguageController>(TYPES.LanguageController)
        .to(LanguageController);
    container
        .bind<IGameVersionGroupUsecase>(TYPES.IGameVersionGroupUsecase)
        .to(GameVersionGroupInteractor)
        .inSingletonScope();
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
