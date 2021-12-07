import LanguageEntity from '@/01-enterprise/entity/Language.entity';
import ILanguageRepository from '@/02-application/repository/ILanguage.repository';
import { injectable } from 'inversify';

@injectable()
export default class LanguageRepository implements ILanguageRepository {
    public findAllOrderByNameAsc(): Promise<LanguageEntity[]> {
        return LanguageEntity.createQueryBuilder('language')
            .orderBy('language.name', 'ASC')
            .getMany();
    }

    public findByName(name: string): Promise<LanguageEntity | undefined> {
        return LanguageEntity.createQueryBuilder('language')
            .where('language.name = :name', { name })
            .getOne();
    }
}
