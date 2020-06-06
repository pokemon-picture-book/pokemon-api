import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import ISearchPokemonUsecase from '@/usecase/pokemon/ISearchPokemonUsecase';
import TYPES from '@/registory/inversify.types';
import IPokemonRepository from '@/domain/repository/IPokemonRepository';
import Pokemons from '@/domain/entity/Pokemons';
import PokemonSearchResponse from '@/usecase/dto/model/PokemonSearchResponse';
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
