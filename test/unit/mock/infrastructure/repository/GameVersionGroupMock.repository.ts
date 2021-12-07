import { injectable } from 'inversify';
import GameVersionEntity from '@/01-enterprise/entity/GameVersion.entity';
import GameVersionGroupEntity from '@/01-enterprise/entity/GameVersionGroup.entity';
import GameVersionGroupRegionEntity from '@/01-enterprise/entity/GameVersionGroupRegion.entity';
import PokemonGameImageEntity from '@/01-enterprise/entity/PokemonGameImage.entity';
import IGameVersionGroupRepository from '@/02-application/repository/IGameVersionGroup.repository';

@injectable()
export default class GameVersionGroupMockRepository
    implements IGameVersionGroupRepository {
    public async findByAlias(
        alias: string
    ): Promise<GameVersionGroupEntity | undefined> {
        return alias
            ? new GameVersionGroupEntity(
                  1,
                  'alias',
                  true,
                  [new GameVersionEntity()],
                  [new PokemonGameImageEntity()],
                  [new GameVersionGroupRegionEntity()]
              )
            : undefined;
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
                      [new GameVersionGroupRegionEntity()]
                  ),
              ]
            : [];
    }
}
