import { Container } from 'inversify';

import IPokemonRepository from '@/domain/repositories/IPokemonRepository';
import PokemonRepository from '@/infrastructure/repositories/PokemonRepository';
import ISearchPokemonUsecase from '@/usecases/pokemons/ISearchPokemonUsecase';
import SearchPokemonInteractor from '@/interactores/pokemons/SearchPokemonInteractor';
import PokemonController from '@/controllers/pokemons/PokemonController';

import TYPES from '@/registories/inversify.types';

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
