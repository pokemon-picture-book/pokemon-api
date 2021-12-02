import LanguageEntity from '@/01-enterprise/entity/Language.entity';
import ILanguagePresenter from '@/02-application/presenter/ILanguage.presenter';
import ILanguageRepository from '@/02-application/repository/ILanguage.repository';
import TYPES from '@/inversify.types';
import ILanguageUsecase from '@/02-application/usecase/ILanguage.usecase';
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
