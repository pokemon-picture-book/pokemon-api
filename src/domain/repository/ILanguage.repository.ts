import LanguageEntity from '@/domain/entity/Language.entity';

export default interface ILanguageRepository {
    findByName(name: string): Promise<LanguageEntity | undefined>;
}
