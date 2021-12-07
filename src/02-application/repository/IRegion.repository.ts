import RegionEntity from '@/01-enterprise/entity/Region.entity';

export default interface IRegionRepository {
    findByLanguageId(languageId: number): Promise<RegionEntity[]>;
    findAllByNameIn(names: string[]): Promise<RegionEntity[]>;
}
