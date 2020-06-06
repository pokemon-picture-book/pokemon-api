import { Container } from 'inversify';

import IPokemonRepository from '@/domain/repository/IPokemonRepository';
import PokemonRepository from '@/infrastructure/repository/PokemonRepository';
import ISearchPokemonUsecase from '@/usecase/pokemon/ISearchPokemonUsecase';
import SearchPokemonInteractor from '@/interactor/pokemon/SearchPokemonInteractor';
import PokemonController from '@/controller/pokemon/PokemonController';

import TYPES from '@/registory/inversify.types';
import IPokemonPresenter from '@/domain/presenter/IPokemonPresenter';
import PokemonPresenter from '@/presenter/PokemonPresenter';

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
