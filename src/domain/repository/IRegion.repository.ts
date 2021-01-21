import RegionEntity from '@/domain/entity/Region.entity';

export default interface IRegionRepository {
    findByLanguageId(languageId: number): Promise<RegionEntity[]>;
    findAllByNameIn(names: string[]): Promise<RegionEntity[]>;
}
