import RegionEntity from '@/domain/entity/Region.entity';

export default interface IRegionRepository {
    findByLanguageId(languageId: number): Promise<RegionEntity[]>;
    findByNameIn(names: string[]): Promise<RegionEntity[]>;
}
