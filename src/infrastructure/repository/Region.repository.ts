import RegionEntity from '@/domain/entity/Region.entity';
import IRegionRepository from '@/domain/repository/IRegion.repository';
import { injectable } from 'inversify';

@injectable()
export default class RegionRepository implements IRegionRepository {
    public findByLanguageId(languageId: number): Promise<RegionEntity[]> {
        return RegionEntity.createQueryBuilder('region')
            .innerJoinAndSelect(
                'region.regionNames',
                'regionName',
                'regionName.language_id = :languageId',
                { languageId }
            )
            .innerJoinAndSelect(
                'region.gameVersionGroupRegions',
                'gameVersionGroupRegion'
            )
            .innerJoinAndSelect(
                'gameVersionGroupRegion.gameVersionGroup',
                'gameVersionGroup'
            )
            .orderBy({
                'region.id': 'ASC',
                'gameVersionGroup.id': 'ASC',
            })
            .getMany();
    }

    public findAllByNameIn(names: string[]): Promise<RegionEntity[]> {
        return RegionEntity.createQueryBuilder('region')
            .where('region.name IN (:names)', { names })
            .getMany();
    }
}
