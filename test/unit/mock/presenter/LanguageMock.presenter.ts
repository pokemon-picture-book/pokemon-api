import LanguageEntity from '@/01-enterprise/entity/Language.entity';
import ILanguagePresenter from '@/02-application/presenter/ILanguage.presenter';
import { LanguageResponse } from 'app-response-model';
import { injectable } from 'inversify';

@injectable()
export default class LanguageMockPresenter implements ILanguagePresenter {
    public toLanguageResponse(Languages: LanguageEntity[]): LanguageResponse[] {
        return Languages.map(
            (): LanguageResponse => ({
                id: 1,
                name: 'name',
                labelName: 'labelName'
            })
        );
    }
}
