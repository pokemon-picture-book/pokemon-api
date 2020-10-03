import IRegionRepository from '@/domain/repository/IRegion.repository';
import driver from '@/driver';
import RegionRepository from '@/infrastructure/repository/Region.repository';

describe('Unit test for Region repository', () => {
    const repository: IRegionRepository = new RegionRepository();

    beforeAll(async () => {
        await driver.connect();
    });

    afterAll(() => {
        driver.close();
    });

    test('正常: names を指定した場合、正しい結果が取得できているか', async done => {
        const regions = await repository.findByNameIn(['kanto', 'alola']);
        expect(regions.length).toBe(2);

        const kanto = regions.find(region => region.name === 'kanto');
        expect(kanto).not.toBeNull();

        const alola = regions.find(region => region.name === 'alola');
        expect(alola).not.toBeNull();

        done();
    });

    test('異常: names に存在しないデータのパラメータを指定した場合、空配列となるか', async done => {
        const regions = await repository.findByNameIn(['xxxxx']);
        expect(regions.length).toBe(0);
        done();
    });
});
