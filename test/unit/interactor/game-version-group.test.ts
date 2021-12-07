import IGameVersionGroupUsecase from '@/02-application/usecase/IGameVersionGroup.usecase';
import GameVersionGroupInteractor from '@/02-application/usecase/interactor/GameVersionGroup.interactor';
import TYPES from '@/inversify.types';
import { interactorContainer } from '../registory/inversify.config';

describe('Unit test for GameVersionGroup interactor', () => {
    const usecase: IGameVersionGroupUsecase = interactorContainer.get<GameVersionGroupInteractor>(
        TYPES.IGameVersionGroupUsecase
    );

    test('異常: 異常なパラメータで call した場合、空配列であるか', async (done) => {
        const gameVersionGroups = await usecase.search('', true);
        expect(gameVersionGroups).toHaveLength(0);
        done();
    });
});
