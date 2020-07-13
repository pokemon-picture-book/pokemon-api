/* eslint-disable no-undef */
import LanguageEntity from '@/domain/entity/Language.entity';
import ILanguageRepository from '@/domain/repository/ILanguage.repository';
import driver from '@/driver';
import LanguageRepository from '@/infrastructure/repository/Language.repository';

describe('Unit test for Language repository', () => {
    const repository: ILanguageRepository = new LanguageRepository();

    beforeAll(async () => {
        await driver.connect();
    });

    afterAll(() => {
        driver.close();
    });

    test('正常: name を指定した場合、正しい結果が取得できているか', async done => {
        const language = await repository.findByName('en');
        expect(language).not.toBeNull();
        expect((language as LanguageEntity).name).toBe('en');
        done();
    });

    test('異常: name に存在しないデータのパラメータを指定した場合、undefined となるか', async done => {
        const language = await repository.findByName('xxxxx');
        expect(language).toBeUndefined();
        done();
    });
});
