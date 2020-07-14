import GameVersionGroupEntity from '@/domain/entity/GameVersionGroup.entity';
import IGameVersionGroupRepository from '@/domain/repository/IGameVersionGroup.repository';
import { injectable } from 'inversify';

@injectable()
export default class GameVersionGroupMockRepository
    implements IGameVersionGroupRepository {
    public async findByAlias(
        alias: string
    ): Promise<GameVersionGroupEntity | undefined> {
        return alias ? new GameVersionGroupEntity() : undefined;
    }
}
