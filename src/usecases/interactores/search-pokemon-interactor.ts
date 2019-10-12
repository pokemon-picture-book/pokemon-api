import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import ISearchPokemonUsecase from '@/usecases/search-pokemon-usecase';
import TYPES from '@/registories/registory';
import IPokemonRepository from '@/domain/repositories/pokemon-repository';
import Pokemons from '@/domain/entities/Pokemons';

@injectable()
export default class SearchPokemonInteractor implements ISearchPokemonUsecase {
    @inject(TYPES.IPokemonRepository) private repository: IPokemonRepository;

    public async search(): Promise<Pokemons[]> {
        return this.repository.findAll();
    }
}
