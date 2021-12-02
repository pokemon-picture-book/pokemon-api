import LanguageEntity from '@/01-enterprise/entity/Language.entity';

export default interface ILanguageRepository {
    findAllOrderByNameAsc(): Promise<LanguageEntity[]>;
    findByName(name: string): Promise<LanguageEntity | undefined>;
}
