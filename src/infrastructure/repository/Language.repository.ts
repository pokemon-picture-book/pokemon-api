import ILanguageRepository from '@/domain/repository/ILanguage.repository';
import LanguageEntity from '@/domain/entity/Language.entity';
import { injectable } from 'inversify';

@injectable()
export default class LanguageRepository implements ILanguageRepository {
    public findByName(name: string): Promise<LanguageEntity | undefined> {
        return LanguageEntity.createQueryBuilder('language')
            .where('language.name = :name', { name })
            .getOne();
    }
}
