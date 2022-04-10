import GameVersionGroupEntity from '@/01-enterprise/entity/GameVersionGroup.entity';
import IGameVersionGroupRepository from '@/02-application/repository/IGameVersionGroup.repository';
import { injectable } from 'inversify';

@injectable()
export default class GameVersionGroupRepository
    implements IGameVersionGroupRepository {
    public findByAlias(
        alias: string
    ): Promise<GameVersionGroupEntity | undefined> {
        return GameVersionGroupEntity.createQueryBuilder('gameVersionGroup')
            .leftJoinAndSelect(
                'gameVersionGroup.gameVersionGroupRegions',
                'gameVersionGroupRegion'
            )
            .leftJoinAndSelect('gameVersionGroupRegion.region', 'region')
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
            .leftJoinAndSelect(
                'gameVersionGroup.gameVersionGroupRegions',
                'gameVersionGroupRegion'
            )
            .leftJoinAndSelect('gameVersionGroupRegion.region', 'region')
            .where('gameVersionGroup.is_supported = :isSupported', {
                isSupported,
            })
            .orderBy({
                'gameVersionGroup.id': 'ASC',
                'gameVersion.id': 'ASC',
                'region.id': 'ASC',
            })
            .getMany();
    }
}
