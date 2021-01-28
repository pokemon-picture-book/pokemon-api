import LanguageEntity from '@/domain/entity/Language.entity';

export default interface ILanguageRepository {
    findAllOrderByNameAsc(): Promise<LanguageEntity[]>;
    findByName(name: string): Promise<LanguageEntity | undefined>;
}
