import ILanguagePresenter from '@/domain/presenter/ILanguage.presenter';
import ILanguageRepository from '@/domain/repository/ILanguage.repository';
import driver from '@/driver';
import LanguageRepository from '@/infrastructure/repository/Language.repository';
import LanguagePresenter from '@/presenter/Language.presenter';

describe('Unit test for Language presenter', () => {
    const presenter: ILanguagePresenter = new LanguagePresenter();

    const repository: ILanguageRepository = new LanguageRepository();

    beforeAll(async () => {
        await driver.connect();
    });

    afterAll(() => {
        driver.close();
    });

    test('正常: 正しくマッピングできているか', async (done) => {
        const actuals = await repository.findAllOrderByNameAsc();
        const languageResponses = presenter.toLanguageResponse(actuals);

        actuals.forEach((actual, i) => {
            expect(languageResponses[i].id).toBe(actual.id);
            expect(languageResponses[i].name).toBe(actual.name);
            expect(languageResponses[i].labelName).toBe(actual.labelName);
        });

        done();
    });

    test('正常: 空配列を渡しても正常に処理されるか', async (done) => {
        const responses = presenter.toLanguageResponse([]);
        expect(responses.length).toBe(0);
        done();
    });
});
