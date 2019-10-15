import { Container } from 'inversify';

import IPokemonRepository from '@/domain/repositories/pokemon-repository';
import PokemonRepository from '@/infrastructures/datastore/pokemon-repository-impl';
import ISearchPokemonUsecase from '@/usecases/search-pokemon-usecase';
import SearchPokemonInteractor from '@/usecases/interactores/search-pokemon-interactor';
import PokemonController from '@/controllers/pokemons/controller';

import TYPES from '@/registories/types';

const container = new Container();
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
