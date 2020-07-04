import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import ISearchPokemonUsecase from '@/usecase/ISearchPokemon.usecase';
import TYPES from '@/registory/inversify.types';
import IPokemonRepository from '@/domain/repository/IPokemon.repository';
import PokemonEntity from '@/domain/entity/Pokemon.entity';
import IPokemonPresenter from '@/domain/presenter/IPokemon.presenter';
import { PokemonSearchResponse } from '@t/response-model';
import ILanguageRepository from '@/domain/repository/ILanguage.repository';
import IGameVersionGroupRepository from '@/domain/repository/IGameVersionGroup.repository';
import IRegionRepository from '@/domain/repository/IRegion.repository';

@injectable()
export default class SearchPokemonInteractor implements ISearchPokemonUsecase {
    @inject(TYPES.IPokemonRepository)
    private repository: IPokemonRepository;

    @inject(TYPES.ILanguageRepository)
    private languageRepository: ILanguageRepository;

    @inject(TYPES.IGameVersionGroupRepository)
    private gameVersionGroupRepository: IGameVersionGroupRepository;

    @inject(TYPES.IRegionRepository)
    private regionRepository: IRegionRepository;

    @inject(TYPES.IPokemonPresenter)
    private presenter: IPokemonPresenter;

    public async search(
        languageName: string,
        gameVersionGroupAlias: string,
        regionNames: string[]
    ): Promise<PokemonSearchResponse[]> {
        const [language, gameVersionGroup, regions] = await Promise.all([
            this.languageRepository.findByName(languageName),
            this.gameVersionGroupRepository.findByAlias(gameVersionGroupAlias),
            this.regionRepository.findByNameIn(regionNames)
        ]);

        if (!language || !gameVersionGroup || !regions.length) {
            console.log('not found...');
            return [];
        }

        const pokemons: PokemonEntity[] = await this.repository.findAll(
            language.id,
            gameVersionGroup.id,
            regions.map(({ id }) => id)
        );
        return this.presenter.toPokemonSearchResponse(pokemons);
    }
}
