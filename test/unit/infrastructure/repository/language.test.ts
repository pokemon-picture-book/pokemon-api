import LanguageEntity from '@/01-enterprise/entity/Language.entity';
import ILanguageRepository from '@/02-application/repository/ILanguage.repository';
import driver from '@/04-framework/db/driver';
import LanguageRepository from '@/03-interface/infrastructure/repository/Language.repository';

describe('Unit test for Language repository', () => {
    const repository: ILanguageRepository = new LanguageRepository();

    beforeAll(async () => {
        await driver.connect();
    });

    afterAll(() => {
        driver.close();
    });

    test('正常: name を指定した場合、正しい結果が取得できているか', async (done) => {
        const language = await repository.findByName('en');
        expect(language).not.toBeNull();
        expect((language as LanguageEntity).name).toBe('en');
        done();
    });

    test('異常: name に存在しないデータのパラメータを指定した場合、undefined となるか', async (done) => {
        const language = await repository.findByName('xxxxx');
        expect(language).toBeUndefined();
        done();
    });

    test('正常: 言語一覧が取得できている・言語名でソートされているか', async (done) => {
        const languages = await repository.findAllOrderByNameAsc();
        expect(languages).toHaveLength(2);

        const [en, ja] = languages;
        expect(en.id).toBe(2);
        expect(en.name).toBe('en');
        expect(ja.id).toBe(1);
        expect(ja.name).toBe('ja-Hrkt');

        done();
    });
});
