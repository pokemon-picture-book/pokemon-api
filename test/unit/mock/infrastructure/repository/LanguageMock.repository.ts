import ILanguageRepository from '@/02-application/repository/ILanguage.repository';
import LanguageEntity from '@/01-enterprise/entity/Language.entity';
import { injectable } from 'inversify';

@injectable()
export default class LanguageMockRepository implements ILanguageRepository {
    async findAllOrderByNameAsc(): Promise<LanguageEntity[]> {
        return [new LanguageEntity(1, 'testLang', [], [], [], [], [], [])];
    }

    public async findByName(name: string): Promise<LanguageEntity | undefined> {
        return name === 'en'
            ? new LanguageEntity(0, name, [], [], [], [], [], [])
            : undefined;
    }
}
