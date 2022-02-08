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
import {
    SearchAllPokemonResponse,
    SearchOnePokemonResponse,
    SearchOnePokemonStatusResponse,
    SearchSimplePokemonResponse,
} from 'app-response-model';

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

    public async searchAll(
        requestParam: {
            languageName?: string;
            gameVersionGroupAlias?: string;
            regionNames?: string[];
        },
        pageParam: {
            offset: number;
            limit: number;
        }
    ): Promise<SearchAllPokemonResponse> {
        const NO_DATA: Readonly<SearchAllPokemonResponse> = {
            hits: 0,
            data: [],
        };
        const {
            languageName,
            gameVersionGroupAlias,
            regionNames,
        } = requestParam;
        const language = await this.languageRepository.findByName(
            languageName || 'en'
        );
        if (!language) {
            return NO_DATA;
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
            return NO_DATA;
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
        return this.presenter.toSearchAllPokemonResponse(hits, pokemons);
    }

    public async searchOne(requestParam: {
        id: number;
        languageName?: string;
        gameVersionGroupAlias?: string;
    }): Promise<SearchOnePokemonResponse | null> {
        const { id, languageName, gameVersionGroupAlias } = requestParam;
        const language = await this.languageRepository.findByName(
            languageName || 'en'
        );
        if (!language) {
            return null;
        }

        const allGames = await this.gameVersionGroupRepository.findAllByIsSupported(
            language.id,
            true
        );
        const matchGame = allGames.find(
            (game) => game.alias === gameVersionGroupAlias
        );

        const whereParam = {
            id,
            languageId: language.id,
            gameVersionGroupId: matchGame ? matchGame.id : allGames[0].id,
        };
        const pokemon = await this.repository.findById(whereParam);

        if (!pokemon) {
            return null;
        }

        return this.presenter.toSearchOnePokemonResponse(pokemon);
    }

    async searchSimpleData(requestParam: {
        languageName?: string | undefined;
    }): Promise<SearchSimplePokemonResponse> {
        const NO_DATA: Readonly<SearchSimplePokemonResponse> = {
            hits: 0,
            data: [],
        };
        const { languageName } = requestParam;
        const language = await this.languageRepository.findByName(
            languageName || 'en'
        );
        if (!language) {
            return NO_DATA;
        }

        const whereParam = {
            languageId: language.id,
        };

        const simplePokemons = await this.repository.findSimpleAll(whereParam);
        return this.presenter.toSearchSimplePokemonResponse(simplePokemons);
    }

    public async searchOneStatus(requestParam: {
        id: number;
        languageName?: string;
    }): Promise<SearchOnePokemonStatusResponse | null> {
        const { id, languageName } = requestParam;
        const language = await this.languageRepository.findByName(
            languageName || 'en'
        );
        if (!language) {
            return null;
        }

        const whereParam = {
            id,
            languageId: language.id,
        };
        const pokemon = await this.repository.findStatusById(whereParam);

        if (!pokemon) {
            return null;
        }

        return this.presenter.toSearchOnePokemonStatusResponse(pokemon);
    }
}
