import RegionEntity from '@/domain/entity/Region.entity';
import IRegionRepository from '@/domain/repository/IRegion.repository';
import { injectable } from 'inversify';

@injectable()
export default class RegionMockRepository implements IRegionRepository {
    public async findByLanguageId(languageId: number): Promise<RegionEntity[]> {
        return languageId ? [new RegionEntity(1, 'region', [], [])] : [];
    }

    public async findAllByNameIn(names: string[]): Promise<RegionEntity[]> {
        return names.length ? [new RegionEntity(1, 'region', [], [])] : [];
    }
}
