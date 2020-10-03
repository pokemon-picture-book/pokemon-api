import RegionEntity from '@/domain/entity/Region.entity';
import IRegionRepository from '@/domain/repository/IRegion.repository';
import { injectable } from 'inversify';

@injectable()
export default class RegionRepository implements IRegionRepository {
    public findByNameIn(names: string[]): Promise<RegionEntity[]> {
        return RegionEntity.createQueryBuilder('region')
            .where('region.name IN (:names)', { names })
            .getMany();
    }
}
