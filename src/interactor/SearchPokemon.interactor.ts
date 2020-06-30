import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import ISearchPokemonUsecase from '@/usecase/ISearchPokemon.usecase';
import TYPES from '@/registory/inversify.types';
import IPokemonRepository from '@/domain/repository/IPokemon.repository';
import PokemonEntity from '@/domain/entity/Pokemon.entity';
import IPokemonPresenter from '@/domain/presenter/IPokemon.presenter';
import { PokemonSearchResponse } from '@t/response-model';

@injectable()
export default class SearchPokemonInteractor implements ISearchPokemonUsecase {
    @inject(TYPES.IPokemonRepository)
    private repository: IPokemonRepository;

    @inject(TYPES.IPokemonPresenter)
    private presenter: IPokemonPresenter;

    public async search(
        languageId: number,
        gameVersionGroupId: number,
        regionIds: number[]
    ): Promise<PokemonSearchResponse[]> {
        const pokemons: PokemonEntity[] = await this.repository.findAll(
            languageId,
            gameVersionGroupId,
            regionIds
        );
        return this.presenter.toPokemonSearchResponse(pokemons);
    }
}
