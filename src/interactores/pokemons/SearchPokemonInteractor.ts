import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import ISearchPokemonUsecase from '@/usecases/pokemons/ISearchPokemonUsecase';
import TYPES from '@/registories/inversify.types';
import IPokemonRepository from '@/domain/repositories/IPokemonRepository';
import Pokemons from '@/domain/entities/Pokemons';
import PokemonSearchResponse from '@/usecases/dto/models/PokemonSearchResponse';
import IPokemonPresenter from '@/domain/presenter/IPokemonPresenter';

@injectable()
export default class SearchPokemonInteractor implements ISearchPokemonUsecase {
    @inject(TYPES.IPokemonRepository)
    private repository: IPokemonRepository;

    @inject(TYPES.IPokemonPresenter)
    private presenter: IPokemonPresenter;

    public async search(): Promise<PokemonSearchResponse[]> {
        const pokemons: Readonly<Pokemons>[] = await this.repository.findAll();
        return this.presenter.mappingAll(pokemons);
    }
}
