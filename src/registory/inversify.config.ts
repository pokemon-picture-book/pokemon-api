import { Container } from 'inversify';

import IPokemonRepository from '@/domain/repository/IPokemon.repository';
import PokemonRepository from '@/infrastructure/repository/Pokemon.repository';
import ISearchPokemonUsecase from '@/usecase/ISearchPokemon.usecase';
import SearchPokemonInteractor from '@/interactor/SearchPokemon.interactor';
import PokemonController from '@/controller/Pokemon.controller';

import TYPES from '@/registory/inversify.types';
import IPokemonPresenter from '@/domain/presenter/IPokemon.presenter';
import PokemonPresenter from '@/presenter/Pokemon.presenter';

const container = new Container();
container.bind<IPokemonPresenter>(TYPES.IPokemonPresenter).to(PokemonPresenter);
container
    .bind<IPokemonRepository>(TYPES.IPokemonRepository)
    .to(PokemonRepository);
container
    .bind<ISearchPokemonUsecase>(TYPES.ISearchPokemonUsecase)
    .to(SearchPokemonInteractor)
    .inSingletonScope();
container
    .bind<PokemonController>(TYPES.PokemonController)
    .to(PokemonController);

export default container;
