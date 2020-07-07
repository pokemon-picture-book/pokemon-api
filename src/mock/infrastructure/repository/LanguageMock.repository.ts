import ILanguageRepository from '@/domain/repository/ILanguage.repository';
import LanguageEntity from '@/domain/entity/Language.entity';
import { injectable } from 'inversify';

@injectable()
export default class LanguageMockRepository implements ILanguageRepository {
    public findByName(name: string): Promise<LanguageEntity | undefined> {
        return Promise.resolve(name ? new LanguageEntity() : undefined);
    }
}
