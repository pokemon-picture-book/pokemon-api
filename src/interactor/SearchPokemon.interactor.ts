import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import ISearchPokemonUsecase from '@/usecase/pokemon/ISearchPokemon.usecase';
import TYPES from '@/registory/inversify.types';
import IPokemonRepository from '@/domain/repository/IPokemon.repository';
import Pokemon from '@/domain/entity/Pokemon.entity';
import PokemonSearchResponse from '@/usecase/dto/model/PokemonSearchResponse';
import IPokemonPresenter from '@/domain/presenter/IPokemon.presenter';

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
        const pokemons: Pokemon[] = await this.repository.findAll(
            languageId,
            gameVersionGroupId,
            regionIds
        );
        return this.presenter.mappingAll(pokemons);
    }
}
