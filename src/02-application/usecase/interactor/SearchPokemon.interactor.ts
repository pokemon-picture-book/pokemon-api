import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import ISearchPokemonUsecase from '@/02-application/usecase/ISearchPokemon.usecase';
import TYPES from '@/inversify.types';
import { getDefaultSet } from '@/01-enterprise/function/game-region.function';
import IPokemonRepository from '@/02-application/repository/IPokemon.repository';
import IPokemonPresenter from '@/02-application/presenter/IPokemon.presenter';
import ILanguageRepository from '@/02-application/repository/ILanguage.repository';
import IGameVersionGroupRepository from '@/02-application/repository/IGameVersionGroup.repository';
import IRegionRepository from '@/02-application/repository/IRegion.repository';
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
