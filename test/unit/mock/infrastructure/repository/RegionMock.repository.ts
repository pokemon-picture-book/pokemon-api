import RegionEntity from '@/domain/entity/Region.entity';
import IRegionRepository from '@/domain/repository/IRegion.repository';
import { injectable } from 'inversify';

@injectable()
export default class RegionMockRepository implements IRegionRepository {
    public async findByNameIn(names: string[]): Promise<RegionEntity[]> {
        return names.length ? [new RegionEntity()] : [];
    }
}
