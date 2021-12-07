import driver from '@/04-framework/db/driver';
import { ROUTING } from '@/04-framework/routes';
import server from '@/04-framework/server';
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

                // 現状、サポートしている地域の件数のみ取得する
                expect(regions.length).toBe(6);

                // 英語の地域データであるか（最初の3つのデータだけで検証する）
                const [kanto, johto, hoenn] = regions;
                expect(kanto.name).toBe('kanto');
                expect(kanto.displayName).toBe('Kanto');
                expect(kanto.relatedGameVersionGroups).toHaveLength(10);
                expect(johto.name).toBe('johto');
                expect(johto.displayName).toBe('Johto');
                expect(johto.relatedGameVersionGroups).toHaveLength(9);
                expect(hoenn.name).toBe('hoenn');
                expect(hoenn.displayName).toBe('Hoenn');
                expect(hoenn.relatedGameVersionGroups).toHaveLength(8);

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

                // 現状、サポートしている地域の件数のみ取得する
                expect(regions.length).toBe(6);

                // 日本語の地域データであるか（最初の3つのデータだけで検証する）
                const [kanto, johto, hoenn] = regions;
                expect(kanto.name).toBe('kanto');
                expect(kanto.displayName).toBe('カントー地方');
                expect(kanto.relatedGameVersionGroups).toHaveLength(10);
                expect(johto.name).toBe('johto');
                expect(johto.displayName).toBe('ジョウト地方');
                expect(johto.relatedGameVersionGroups).toHaveLength(9);
                expect(hoenn.name).toBe('hoenn');
                expect(hoenn.displayName).toBe('ホウエン地方');
                expect(hoenn.relatedGameVersionGroups).toHaveLength(8);

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
