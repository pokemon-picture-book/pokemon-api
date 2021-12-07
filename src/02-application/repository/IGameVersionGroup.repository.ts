import GameVersionGroupEntity from '@/01-enterprise/entity/GameVersionGroup.entity';

export default interface IGameVersionGroupRepository {
    findByAlias(alias: string): Promise<GameVersionGroupEntity | undefined>;
    findAllByIsSupported(
        languageId: number,
        isSupported: boolean
    ): Promise<GameVersionGroupEntity[]>;
}
