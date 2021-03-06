import LanguageEntity from '@/domain/entity/Language.entity';
import { LanguageResponse } from 'app-response-model';

export default interface ILanguagePresenter {
    toLanguageResponse(Languages: LanguageEntity[]): LanguageResponse[];
}
