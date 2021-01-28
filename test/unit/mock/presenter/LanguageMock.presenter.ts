import LanguageEntity from '@/domain/entity/Language.entity';
import ILanguagePresenter from '@/domain/presenter/ILanguage.presenter';
import { LanguageResponse } from 'app-response-model';
import { injectable } from 'inversify';

@injectable()
export default class LanguageMockPresenter implements ILanguagePresenter {
    public toLanguageResponse(Languages: LanguageEntity[]): LanguageResponse[] {
        return Languages.map(
            (): LanguageResponse => {
                return {
                    id: 1,
                    name: 'name',
                };
            }
        );
    }
}
