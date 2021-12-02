import { LanguageResponse } from 'app-response-model';

export default interface ILanguageUsecase {
    search(): Promise<LanguageResponse[]>;
}
