import IRegionRepository from '@/02-application/repository/IRegion.repository';
import driver from '@/04-framework/driver';
import RegionRepository from '@/03-interface/infrastructure/repository/Region.repository';

describe('Unit test for Region repository', () => {
    const repository: IRegionRepository = new RegionRepository();

    beforeAll(async () => {
        await driver.connect();
    });

    afterAll(() => {
        driver.close();
    });

    test('正常: names を指定した場合、正しい結果が取得できているか', async (done) => {
        const regions = await repository.findAllByNameIn(['kanto', 'alola']);
        expect(regions).toHaveLength(2);

        const kanto = regions.find((region) => region.name === 'kanto');
        expect(kanto).not.toBeNull();

        const alola = regions.find((region) => region.name === 'alola');
        expect(alola).not.toBeNull();

        done();
    });

    test('正常： languageId を指定した場合、正しい結果が取得できているか', async (done) => {
        // languageId:1 -> ja-Hrkt
        const regions = await repository.findByLanguageId(1);

        expect(regions).toHaveLength(6);

        const kanto = regions.find((region) => region.name === 'kanto');
        expect(kanto).not.toBeNull();
        expect(kanto?.regionNames).toHaveLength(1);
        expect(kanto?.regionNames[0].name).toEqual('カントー地方');

        done();
    });

    test('異常: names に存在しないデータのパラメータを指定した場合、空配列となるか', async (done) => {
        const regions = await repository.findAllByNameIn(['xxxxx']);
        expect(regions).toHaveLength(0);
        done();
    });

    test('異常: languageId に存在しないパラメータを指定した場合、空配列となるか', async (done) => {
        const regions = await repository.findByLanguageId(-1);
        expect(regions).toHaveLength(0);
        done();
    });
});
