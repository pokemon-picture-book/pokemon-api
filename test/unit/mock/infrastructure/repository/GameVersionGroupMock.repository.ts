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

    public async findAllByIsSupported(
        languageId: number,
        isSupported: boolean
    ): Promise<GameVersionGroupEntity[]> {
        return languageId || isSupported ? [new GameVersionGroupEntity()] : [];
    }
}
