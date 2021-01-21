import IRegionPresenter from '@/domain/presenter/IRegion.presenter';
import IRegionRepository from '@/domain/repository/IRegion.repository';
import driver from '@/driver';
import RegionRepository from '@/infrastructure/repository/Region.repository';
import RegionPresenter from '@/presenter/Region.presenter';

describe('Unit test for Region presenter', () => {
    const presenter: IRegionPresenter = new RegionPresenter();

    const repository: IRegionRepository = new RegionRepository();

    beforeAll(async () => {
        await driver.connect();
    });

    afterAll(() => {
        driver.close();
    });

    test('正常: 正しくマッピングできているか', async (done) => {
        const regions = await repository.findByLanguageId(1);

        const [regionResponce] = presenter.toRegionResponse(regions);
        const [actual] = regions;

        expect(regionResponce.id).toBe(actual.id);
        expect(regionResponce.name).toBe(actual.name);
        expect(regionResponce.displayName).toBe(actual.regionNames[0].name);

        done();
    });

    test('正常: 空配列を渡しても正常に処理されるか', async (done) => {
        const responses = presenter.toRegionResponse([]);
        expect(responses.length).toBe(0);
        done();
    });
});
