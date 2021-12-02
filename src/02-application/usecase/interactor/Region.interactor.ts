import RegionEntity from '@/01-enterprise/entity/Region.entity';
import IRegionPresenter from '@/02-application/presenter/IRegion.presenter';
import IRegionRepository from '@/02-application/repository/IRegion.repository';
import ILanguageRepository from '@/02-application/repository/ILanguage.repository';
import TYPES from '@/inversify.types';
import IRegionUsecase from '@/02-application/usecase/IRegion.usecase';
import { RegionResponse } from 'app-response-model';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export default class RegionInteractor implements IRegionUsecase {
    @inject(TYPES.IRegionRepository)
    private repository: IRegionRepository;

    @inject(TYPES.ILanguageRepository)
    private languageRepository: ILanguageRepository;

    @inject(TYPES.IRegionPresenter)
    private presenter: IRegionPresenter;

    public async search(languageName: string): Promise<RegionResponse[]> {
        const language = await this.languageRepository.findByName(languageName);
        if (!language) {
            return [];
        }
        const regions: RegionEntity[] = await this.repository.findByLanguageId(
            language.id
        );
        return this.presenter.toRegionResponse(regions);
    }
}
