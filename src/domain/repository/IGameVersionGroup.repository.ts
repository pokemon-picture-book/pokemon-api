import GameVersionGroupEntity from '@/domain/entity/GameVersionGroup.entity';

export default interface IGameVersionGroupRepository {
    findByAlias(alias: string): Promise<GameVersionGroupEntity | undefined>;
}
