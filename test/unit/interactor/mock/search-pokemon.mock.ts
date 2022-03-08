import GameVersionEntity from '@/01-enterprise/entity/GameVersion.entity';
import GameVersionGroupEntity from '@/01-enterprise/entity/GameVersionGroup.entity';
import GameVersionGroupRegionEntity from '@/01-enterprise/entity/GameVersionGroupRegion.entity';
import LanguageEntity from '@/01-enterprise/entity/Language.entity';
import PokemonEntity from '@/01-enterprise/entity/Pokemon.entity';
import PokemonEvolutionEntity from '@/01-enterprise/entity/PokemonEvolution.entity';
import PokemonGameImageEntity from '@/01-enterprise/entity/PokemonGameImage.entity';
import RegionEntity from '@/01-enterprise/entity/Region.entity';
import IPokemonPresenter from '@/02-application/presenter/IPokemon.presenter';
import IGameVersionGroupRepository from '@/02-application/repository/IGameVersionGroup.repository';
import ILanguageRepository from '@/02-application/repository/ILanguage.repository';
import IPokemonRepository from '@/02-application/repository/IPokemon.repository';
import IPokemonEvolutionRepository from '@/02-application/repository/IPokemonEvolution.repository';
import IRegionRepository from '@/02-application/repository/IRegion.repository';
import SearchPokemonInteractor from '@/02-application/usecase/interactor/SearchPokemon.interactor';
import ISearchPokemonUsecase from '@/02-application/usecase/ISearchPokemon.usecase';
import TYPES from '@test/unit/registory/inversify.types';
import {
    SearchAllPokemonResponse,
    SearchOnePokemonResponse,
    SearchOnePokemonStatusResponse,
    SearchSimplePokemonResponse,
} from 'app-response-model';
import { Container, injectable } from 'inversify';

export const getSearchOneContainer = (): Readonly<Container> => {
    @injectable()
    class LanguageMockRepository implements ILanguageRepository {
        findAllOrderByNameAsc(): Promise<LanguageEntity[]> {
            throw new Error('Method not implemented.');
        }

        public async findByName(
            name: string
        ): Promise<LanguageEntity | undefined> {
            return name === 'en'
                ? new LanguageEntity(1, name, [], [], [], [], [], [])
                : undefined;
        }
    }

    @injectable()
    class GameVersionGroupMockRepository
        implements IGameVersionGroupRepository {
        async findByAlias(
            alias: string
        ): Promise<GameVersionGroupEntity | undefined> {
            return new GameVersionGroupEntity(
                1,
                alias,
                true,
                [new GameVersionEntity()],
                [new PokemonGameImageEntity()],
                [
                    new GameVersionGroupRegionEntity(
                        1,
                        new GameVersionGroupEntity(
                            1,
                            alias,
                            true,
                            [new GameVersionEntity()],
                            [new PokemonGameImageEntity()],
                            [new GameVersionGroupRegionEntity()]
                        ),
                        new RegionEntity(1, 'regionName', [], [], [])
                    ),
                ]
            );
        }

        public async findAllByIsSupported(
            languageId: number,
            isSupported: boolean
        ): Promise<GameVersionGroupEntity[]> {
            return languageId
                ? [
                      new GameVersionGroupEntity(
                          1,
                          'alias',
                          isSupported,
                          [new GameVersionEntity()],
                          [new PokemonGameImageEntity()],
                          [
                              new GameVersionGroupRegionEntity(
                                  1,
                                  new GameVersionGroupEntity(
                                      1,
                                      'alias',
                                      isSupported,
                                      [new GameVersionEntity()],
                                      [new PokemonGameImageEntity()],
                                      [new GameVersionGroupRegionEntity()]
                                  ),
                                  new RegionEntity(1, 'regionName', [], [], [])
                              ),
                          ]
                      ),
                  ]
                : [];
        }
    }

    @injectable()
    class RegionMockRepository implements IRegionRepository {
        async findByLanguageId(): Promise<RegionEntity[]> {
            return [new RegionEntity(1, 'region', [], [], [])];
        }

        async findAllByNameIn(): Promise<RegionEntity[]> {
            return [new RegionEntity(1, 'regionName', [], [], [])];
        }
    }

    @injectable()
    class PokemonEvolutionMockRepository
        implements IPokemonEvolutionRepository {
        async findAllByPokemonId(): Promise<PokemonEvolutionEntity[]> {
            return [];
        }
    }

    @injectable()
    class PokemonMockRepository implements IPokemonRepository {
        async findAll(): Promise<PokemonEntity[]> {
            return [new PokemonEntity()];
        }

        findAllCount(): Promise<number> {
            throw new Error('Method not implemented.');
        }

        findSimpleAll(): Promise<PokemonEntity[]> {
            throw new Error('Method not implemented.');
        }

        public async findById(whereParam: {
            id: number;
            languageId: number;
            gameVersionGroupId: number;
        }): Promise<PokemonEntity | undefined> {
            return whereParam.id > 0 ? new PokemonEntity() : undefined;
        }

        findStatusById(): Promise<PokemonEntity | undefined> {
            throw new Error('Method not implemented.');
        }
    }

    @injectable()
    class PokemonMockPresenter implements IPokemonPresenter {
        toSearchAllPokemonResponse(): Promise<SearchAllPokemonResponse> {
            throw new Error('Method not implemented.');
        }

        toSearchSimplePokemonResponse(): SearchSimplePokemonResponse {
            throw new Error('Method not implemented.');
        }

        toSearchOnePokemonResponse(
            _: PokemonEntity
        ): Promise<SearchOnePokemonResponse> {
            throw new Error('Method not implemented.');
        }

        toSearchOnePokemonStatusResponse(): SearchOnePokemonStatusResponse {
            throw new Error('Method not implemented.');
        }
    }

    const container: Readonly<Container> = new Container();

    container
        .bind<IPokemonPresenter>(TYPES.IPokemonPresenter)
        .to(PokemonMockPresenter);
    container
        .bind<IPokemonRepository>(TYPES.IPokemonRepository)
        .to(PokemonMockRepository);
    container
        .bind<ILanguageRepository>(TYPES.ILanguageRepository)
        .to(LanguageMockRepository);
    container
        .bind<IGameVersionGroupRepository>(TYPES.IGameVersionGroupRepository)
        .to(GameVersionGroupMockRepository);
    container
        .bind<IRegionRepository>(TYPES.IRegionRepository)
        .to(RegionMockRepository);
    container
        .bind<IPokemonEvolutionRepository>(TYPES.IPokemonEvolutionRepository)
        .to(PokemonEvolutionMockRepository);
    container
        .bind<ISearchPokemonUsecase>(TYPES.ISearchPokemonUsecase)
        .to(SearchPokemonInteractor)
        .inSingletonScope();

    return container;
};

export default {
    getSearchOneContainer,
};
