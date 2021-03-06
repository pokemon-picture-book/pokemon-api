import driver from '@/driver';
import { ROUTING } from '@/routes';
import server from '@/server';
import { RegionQueryParam } from 'app-request-model';
import { RegionResponse } from 'app-response-model';
import * as request from 'supertest';

describe('Integration test for region', () => {
    beforeAll(async () => {
        await driver.connect();
    });

    afterAll(() => {
        driver.close();
    });

    test('正常: クエリパラメータなしでリクエストした際に英語の地域データで取得できているか', (done) => {
        request(server)
            .get(`${ROUTING.API}${ROUTING.REGION}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                const regions: RegionResponse[] = response.body;

                // 英語データだと 7 件となる
                expect(regions.length).toBe(7);

                // 英語の地域データであるか（最初の3つのデータだけで検証する）
                const [kanto, johto, hoenn] = regions;
                expect(kanto.name).toBe('kanto');
                expect(kanto.displayName).toBe('Kanto');
                expect(johto.name).toBe('johto');
                expect(johto.displayName).toBe('Johto');
                expect(hoenn.name).toBe('hoenn');
                expect(hoenn.displayName).toBe('Hoenn');

                done();
            });
    });

    test('正常: lang パラメータを送信した際に、指定した言語でのデータが取得できているか', (done) => {
        const queryParam: Readonly<RegionQueryParam> = {
            lang: 'ja-Hrkt',
        };

        request(server)
            .get(`${ROUTING.API}${ROUTING.REGION}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                const regions: RegionResponse[] = response.body;

                // 日本語データだと 6 件となる
                expect(regions.length).toBe(6);

                // 日本語の地域データであるか（最初の3つのデータだけで検証する）
                const [kanto, johto, hoenn] = regions;
                expect(kanto.name).toBe('kanto');
                expect(kanto.displayName).toBe('カントー地方');
                expect(johto.name).toBe('johto');
                expect(johto.displayName).toBe('ジョウト地方');
                expect(hoenn.name).toBe('hoenn');
                expect(hoenn.displayName).toBe('ホウエン地方');

                done();
            });
    });

    test('異常: lang に不正な値を入れ、リクエストを送信した際 400 (バリデーションエラー) となるか', (done) => {
        const queryParam: Readonly<RegionQueryParam> = {
            lang: 'xxxxx',
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.REGION}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(400, done);
    });
});
