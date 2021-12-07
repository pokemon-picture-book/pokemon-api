import GameVersionGroupEntity from '@/01-enterprise/entity/GameVersionGroup.entity';
import IGameVersionGroupPresenter from '@/02-application/presenter/IGameVersionGroup.presenter';
import IGameVersionGroupRepository from '@/02-application/repository/IGameVersionGroup.repository';
import ILanguageRepository from '@/02-application/repository/ILanguage.repository';
import TYPES from '@/inversify.types';
import IGameVersionGroupUsecase from '@/02-application/usecase/IGameVersionGroup.usecase';
import { GameVersionGroupResponse } from 'app-response-model';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export default class GameVersionGroupInteractor
    implements IGameVersionGroupUsecase {
    @inject(TYPES.IGameVersionGroupRepository)
    private repository: IGameVersionGroupRepository;

    @inject(TYPES.ILanguageRepository)
    private languageRepository: ILanguageRepository;

    @inject(TYPES.IGameVersionGroupPresenter)
    private presenter: IGameVersionGroupPresenter;

    public async search(
        languageName: string,
        isSupported: boolean
    ): Promise<GameVersionGroupResponse[]> {
        const language = await this.languageRepository.findByName(languageName);
        if (!language) {
            return [];
        }
        const gameVersionGroups: GameVersionGroupEntity[] = await this.repository.findAllByIsSupported(
            language.id,
            isSupported
        );
        return this.presenter.toGameVersionGroupResponse(gameVersionGroups);
    }
}
