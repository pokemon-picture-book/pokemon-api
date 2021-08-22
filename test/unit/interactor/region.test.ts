import IRegionUsecase from '@/usecase/IRegion.usecase';
import RegionInteractor from '@/interactor/Region.interactor';
import TYPES from '@/registory/inversify.types';
import { interactorContainer } from '../registory/inversify.config';

describe('Unit test for Region interactor', () => {
    const usecase: IRegionUsecase = interactorContainer.get<RegionInteractor>(
        TYPES.IRegionUsecase
    );

    test('異常: 異常なパラメータで call した場合、空配列であるか', async (done) => {
        const regions = await usecase.search('');
        expect(regions).toHaveLength(0);
        done();
    });
});
