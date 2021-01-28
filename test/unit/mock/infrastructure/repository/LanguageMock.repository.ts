import ILanguageRepository from '@/domain/repository/ILanguage.repository';
import LanguageEntity from '@/domain/entity/Language.entity';
import { injectable } from 'inversify';

@injectable()
export default class LanguageMockRepository implements ILanguageRepository {
    async findAllOrderByNameAsc(): Promise<LanguageEntity[]> {
        return [new LanguageEntity(1, 'testLang', [], [], [], [], [], [])];
    }

    public async findByName(name: string): Promise<LanguageEntity | undefined> {
        return name
            ? new LanguageEntity(1, 'testLang', [], [], [], [], [], [])
            : undefined;
    }
}
