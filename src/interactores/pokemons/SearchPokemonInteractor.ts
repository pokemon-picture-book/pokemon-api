import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import ISearchPokemonUsecase from '@/usecases/pokemons/ISearchPokemonUsecase';
import TYPES from '@/registories/inversify.types';
import IPokemonRepository from '@/domain/repositories/IPokemonRepository';
import Pokemons from '@/domain/entities/Pokemons';

@injectable()
export default class SearchPokemonInteractor implements ISearchPokemonUsecase {
    @inject(TYPES.IPokemonRepository)
    private repository: IPokemonRepository;

    public async search(): Promise<Pokemons[]> {
        return this.repository.findAll();
    }
}
