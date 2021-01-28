import LanguageEntity from '@/domain/entity/Language.entity';
import ILanguagePresenter from '@/domain/presenter/ILanguage.presenter';
import ILanguageRepository from '@/domain/repository/ILanguage.repository';
import TYPES from '@/registory/inversify.types';
import ILanguageUsecase from '@/usecase/ILanguage.usecase';
import { LanguageResponse } from 'app-response-model';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export default class LanguageInteractor implements ILanguageUsecase {
    @inject(TYPES.ILanguageRepository)
    private repository: ILanguageRepository;

    @inject(TYPES.ILanguagePresenter)
    private presenter: ILanguagePresenter;

    public async search(): Promise<LanguageResponse[]> {
        const Languages: LanguageEntity[] = await this.repository.findAllOrderByNameAsc();
        return this.presenter.toLanguageResponse(Languages);
    }
}
