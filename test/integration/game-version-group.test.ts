/* eslint-disable no-undef */
import { GameVersionGroupResponse } from '@/@types/response-model';
import driver from '@/driver';
import { ROUTING } from '@/routes';
import server from '@/server';
import * as request from 'supertest';

describe('Integration test for gameVersionGroup', () => {
    beforeAll(async () => {
        await driver.connect();
    });

    afterAll(() => {
        driver.close();
    });

    test('正常: クエリパラメータなしでリクエストした際にサポートされたゲームバージョンが英語のデータで取得できているか', done => {
        request(server)
            .get(`${ROUTING.API}${ROUTING.GAME_VERSION_GROUP}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                const gameVersionGroups: GameVersionGroupResponse[] =
                    response.body;

                // supported = true のバージョンデータ数は 11 のため
                const actualNum = 11;
                expect(gameVersionGroups.length).toBe(actualNum);

                // サポートされたバージョンであり、英語のデータであるか（最初の3つのデータだけで検証する）
                const [rgby, gsc, rse] = gameVersionGroups;
                expect(rgby.alias).toBe('rgby');
                expect(rgby.name).toBe('Red/Blue/Yellow');
                expect(gsc.alias).toBe('gsc');
                expect(gsc.name).toBe('Gold/Silver/Crystal');
                expect(rse.alias).toBe('rse');
                expect(rse.name).toBe('Ruby/Sapphire/Emerald');

                done();
            });
    });

    test('正常: lang パラメータを送信した際に、指定した言語でのデータが取得できているか', done => {
        const queryParam: Readonly<GameVersionGroupQueryParam> = {
            lang: 'ja-Hrkt'
        };

        request(server)
            .get(`${ROUTING.API}${ROUTING.GAME_VERSION_GROUP}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                const gameVersionGroups: GameVersionGroupResponse[] =
                    response.body;

                // 日本語のデータであるか（最初の3つのデータだけで検証する）
                const [rgby, gsc, rse] = gameVersionGroups;
                expect(rgby.alias).toBe('rgby');
                expect(rgby.name).toBe('赤/緑/ピカチュウ');
                expect(gsc.alias).toBe('gsc');
                expect(gsc.name).toBe('金/銀/クリスタル');
                expect(rse.alias).toBe('rse');
                expect(rse.name).toBe('ルビー/サファイア/エメラルド');

                done();
            });
    });

    test('正常: supported パラメータを送信した際に、指定したサポートの有無に対応したデータが取得できるか', done => {
        const queryParam: Readonly<GameVersionGroupQueryParam> = {
            supported: 'false'
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.GAME_VERSION_GROUP}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                const gameVersionGroups: GameVersionGroupResponse[] =
                    response.body;

                // supported = false のバージョンデータ数は 4 のため
                const actualNum = 4;
                expect(gameVersionGroups.length).toBe(actualNum);

                // supported = false に対応したデータであるか
                const [colosseum, xd, bw2] = gameVersionGroups;
                expect(colosseum.alias).toBe('c');
                expect(colosseum.name).toBe('Colosseum');
                expect(xd.alias).toBe('x');
                expect(xd.name).toBe('XD');
                expect(bw2.alias).toBe('bw2');
                expect(bw2.name).toBe('Black 2/White 2');

                done();
            });
    });

    test('正常: lang / supported パラメータを送信した際に、指定したデータが取得できているか', done => {
        const queryParam: Readonly<GameVersionGroupQueryParam> = {
            lang: 'ja-Hrkt',
            supported: 'true'
        };

        request(server)
            .get(`${ROUTING.API}${ROUTING.GAME_VERSION_GROUP}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                const gameVersionGroups: GameVersionGroupResponse[] =
                    response.body;

                // supported = true のバージョンデータ数は 11 のため
                const actualNum = 11;
                expect(gameVersionGroups.length).toBe(actualNum);

                // 日本語のデータであるか（最初の3つのデータだけで検証する）
                const [rgby, gsc, rse] = gameVersionGroups;
                expect(rgby.alias).toBe('rgby');
                expect(rgby.name).toBe('赤/緑/ピカチュウ');
                expect(gsc.alias).toBe('gsc');
                expect(gsc.name).toBe('金/銀/クリスタル');
                expect(rse.alias).toBe('rse');
                expect(rse.name).toBe('ルビー/サファイア/エメラルド');

                done();
            });
    });

    test('異常: lang に不正な値を入れ、リクエストを送信した際 404 となるか', done => {
        const queryParam: Readonly<GameVersionGroupQueryParam> = {
            lang: 'xxxxx'
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.GAME_VERSION_GROUP}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(404, done);
    });

    test('異常: supported に不正な値を入れ、リクエストを送信した際 200 となるか', done => {
        const queryParam: Readonly<GameVersionGroupQueryParam> = {
            supported: 'xxxxx'
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.GAME_VERSION_GROUP}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    test('異常: lang / supported とは別のパラメータを設定した場合、サポートされたバージョンで英語のデータが取得できているか', done => {
        const queryParam: Readonly<any> = {
            xxxx: true
        };

        request(server)
            .get(`${ROUTING.API}${ROUTING.GAME_VERSION_GROUP}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                const gameVersionGroups: GameVersionGroupResponse[] =
                    response.body;

                // supported = true のバージョンデータ数は 11 のため
                const actualNum = 11;
                expect(gameVersionGroups.length).toBe(actualNum);

                // サポートされたバージョンであり、英語のデータであるか（最初の3つのデータだけで検証する）
                const [rgby, gsc, rse] = gameVersionGroups;
                expect(rgby.alias).toBe('rgby');
                expect(rgby.name).toBe('Red/Blue/Yellow');
                expect(gsc.alias).toBe('gsc');
                expect(gsc.name).toBe('Gold/Silver/Crystal');
                expect(rse.alias).toBe('rse');
                expect(rse.name).toBe('Ruby/Sapphire/Emerald');

                done();
            });
    });
});
