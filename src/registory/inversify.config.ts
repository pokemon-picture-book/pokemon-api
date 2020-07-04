import { Container } from 'inversify';

import IPokemonRepository from '@/domain/repository/IPokemon.repository';
import PokemonRepository from '@/infrastructure/repository/Pokemon.repository';
import ISearchPokemonUsecase from '@/usecase/ISearchPokemon.usecase';
import SearchPokemonInteractor from '@/interactor/SearchPokemon.interactor';
import PokemonController from '@/controller/Pokemon.controller';

import TYPES from '@/registory/inversify.types';
import IPokemonPresenter from '@/domain/presenter/IPokemon.presenter';
import PokemonPresenter from '@/presenter/Pokemon.presenter';
import ILanguageRepository from '@/domain/repository/ILanguage.repository';
import LanguageRepository from '@/infrastructure/repository/Language.repository';
import IGameVersionGroupRepository from '@/domain/repository/IGameVersionGroup.repository';
import GameVersionGroupRepository from '@/infrastructure/repository/GameVersionGroup.repository';
import IRegionRepository from '@/domain/repository/IRegion.repository';
import RegionRepository from '@/infrastructure/repository/Region.repository';

const container = new Container();
container.bind<IPokemonPresenter>(TYPES.IPokemonPresenter).to(PokemonPresenter);
container
    .bind<IPokemonRepository>(TYPES.IPokemonRepository)
    .to(PokemonRepository);
container
    .bind<ILanguageRepository>(TYPES.ILanguageRepository)
    .to(LanguageRepository);
container
    .bind<IGameVersionGroupRepository>(TYPES.IGameVersionGroupRepository)
    .to(GameVersionGroupRepository);
container.bind<IRegionRepository>(TYPES.IRegionRepository).to(RegionRepository);
container
    .bind<ISearchPokemonUsecase>(TYPES.ISearchPokemonUsecase)
    .to(SearchPokemonInteractor)
    .inSingletonScope();
container
    .bind<PokemonController>(TYPES.PokemonController)
    .to(PokemonController);

export default container;
