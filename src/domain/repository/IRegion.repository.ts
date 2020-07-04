import RegionEntity from '@/domain/entity/Region.entity';

export default interface IRegionRepository {
    findByNameIn(names: string[]): Promise<RegionEntity[]>;
}
