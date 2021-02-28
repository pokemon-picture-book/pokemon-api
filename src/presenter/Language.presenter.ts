import LanguageEntity from '@/domain/entity/Language.entity';
import ILanguagePresenter from '@/domain/presenter/ILanguage.presenter';
import { LanguageResponse } from 'app-response-model';
import { injectable } from 'inversify';

@injectable()
export default class LanguagePresenter implements ILanguagePresenter {
    public toLanguageResponse(Languages: LanguageEntity[]): LanguageResponse[] {
        return Languages.map((language) => ({
            id: language.id,
            name: language.name,
            labelName: language.labelName,
        }));
    }
}
