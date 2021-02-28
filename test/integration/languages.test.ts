import driver from '@/driver';
import { ROUTING } from '@/routes';
import server from '@/server';
import { LanguageResponse } from 'app-response-model';
import * as request from 'supertest';

describe('Integration test for language', () => {
    beforeAll(async () => {
        await driver.connect();
    });

    afterAll(() => {
        driver.close();
    });

    test('正常: リクエストした際に言語データで取得できているか', (done) => {
        request(server)
            .get(`${ROUTING.API}${ROUTING.LANGUAGE}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                const languages: LanguageResponse[] = response.body;

                expect(languages.length).toBe(2);

                const [en, ja] = languages;
                expect(en.name).toBe('en');
                expect(ja.name).toBe('ja-Hrkt');
                expect(ja.labelName).toBe('日本語');

                done();
            });
    });
});
