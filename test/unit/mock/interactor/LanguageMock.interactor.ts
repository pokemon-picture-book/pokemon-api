import ILanguageUsecase from '@/usecase/ILanguage.usecase';
import { LanguageResponse } from 'app-response-model';
import { injectable } from 'inversify';

@injectable()
export class LanguageMockInteractor implements ILanguageUsecase {
    public async search(): Promise<LanguageResponse[]> {
        return [{ id: 1, name: 'en' }];
    }
}

@injectable()
export class LanguageEmptyMockInteractor implements ILanguageUsecase {
    public async search(): Promise<LanguageResponse[]> {
        return [];
    }
}

export default {};
