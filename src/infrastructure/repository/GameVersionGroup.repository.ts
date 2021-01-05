import GameVersionGroupEntity from '@/domain/entity/GameVersionGroup.entity';
import IGameVersionGroupRepository from '@/domain/repository/IGameVersionGroup.repository';
import { injectable } from 'inversify';

@injectable()
export default class GameVersionGroupRepository
    implements IGameVersionGroupRepository {
    public findByAlias(
        alias: string
    ): Promise<GameVersionGroupEntity | undefined> {
        return GameVersionGroupEntity.createQueryBuilder('gameVersionGroup')
            .where('gameVersionGroup.alias = :alias', { alias })
            .getOne();
    }

    public findAllByIsSupported(
        languageId: number,
        isSupported: boolean
    ): Promise<GameVersionGroupEntity[]> {
        return GameVersionGroupEntity.createQueryBuilder('gameVersionGroup')
            .innerJoinAndSelect('gameVersionGroup.gameVersions', 'gameVersion')
            .innerJoinAndSelect(
                'gameVersion.gameVersionNames',
                'gameVersionName',
                'gameVersionName.language_id = :languageId',
                { languageId }
            )
            .where('gameVersionGroup.is_supported = :isSupported', {
                isSupported,
            })
            .getMany();
    }
}
