import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import ISearchPokemonUsecase from '@/usecase/ISearchPokemon.usecase';
import TYPES from '@/registory/inversify.types';
import { getDefaultSet } from '@/domain/function/game-region.function';
import IPokemonRepository from '@/domain/repository/IPokemon.repository';
import IPokemonPresenter from '@/domain/presenter/IPokemon.presenter';
import ILanguageRepository from '@/domain/repository/ILanguage.repository';
import IGameVersionGroupRepository from '@/domain/repository/IGameVersionGroup.repository';
import IRegionRepository from '@/domain/repository/IRegion.repository';
import { PokemonSearchResponse } from 'app-response-model';

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
        requestParam: {
            languageName?: string;
            gameVersionGroupAlias?: string;
            regionNames?: string[];
        },
        pageParam: {
            offset: number;
            limit: number;
        }
    ): Promise<PokemonSearchResponse> {
        const {
            languageName,
            gameVersionGroupAlias,
            regionNames,
        } = requestParam;
        const language = await this.languageRepository.findByName(
            languageName || 'en'
        );
        if (!language) {
            return {
                hits: 0,
                data: [],
            };
        }

        const [allGames, allRegions] = await Promise.all([
            this.gameVersionGroupRepository.findAllByIsSupported(
                language.id,
                true
            ),
            this.regionRepository.findByLanguageId(language.id),
        ]);

        const gameRegion = getDefaultSet(
            {
                game: gameVersionGroupAlias || '',
                regions: regionNames || [],
            },
            {
                allGames,
                allRegions,
            }
        );
        const [gameVersionGroup, regions] = await Promise.all([
            this.gameVersionGroupRepository.findByAlias(gameRegion.game),
            this.regionRepository.findAllByNameIn(gameRegion.regions),
        ]);

        if (!(gameVersionGroup && regions.length)) {
            return {
                hits: 0,
                data: [],
            };
        }

        const whereParam = {
            languageId: language.id,
            gameVersionGroupId: gameVersionGroup.id,
            regionIds: regions.map(({ id }) => id),
            isPokemonMainImage: true,
        };
        const [hits, pokemons] = await Promise.all([
            this.repository.findAllCount(whereParam),
            this.repository.findAll(whereParam, {
                offset: pageParam.offset,
                limit: pageParam.limit,
            }),
        ]);
        return this.presenter.toPokemonSearchResponse(hits, pokemons);
    }
}
