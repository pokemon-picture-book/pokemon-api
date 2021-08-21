import { injectable } from 'inversify';
import GameVersionEntity from '@/domain/entity/GameVersion.entity';
import GameVersionGroupEntity from '@/domain/entity/GameVersionGroup.entity';
import GameVersionGroupRegionEntity from '@/domain/entity/GameVersionGroupRegion.entity';
import PokemonGameImageEntity from '@/domain/entity/PokemonGameImage.entity';
import IGameVersionGroupRepository from '@/domain/repository/IGameVersionGroup.repository';

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
