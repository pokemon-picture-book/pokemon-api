import driver from '@/driver';
import { ROUTING } from '@/routes';
import server from '@/server';
import { getRegionPokemonNum } from '@test/shared/region';
import { SearchPokemonQueryParam } from 'app-request-model';
import { PokemonSearchResponse } from 'app-response-model';
import * as request from 'supertest';

describe('Integration test for pokemon', () => {
    beforeAll(async () => {
        await driver.connect();
    });

    afterAll(() => {
        driver.close();
    });

    test('正常: クエリパラメータなしでリクエストした際に一番古い地域・ゲームバージョンで英語のデータが取得できているか', (done) => {
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                const pokemons: PokemonSearchResponse[] = response.body;

                // 一番古い地域でのポケモンの数であるか
                const actualNum = getRegionPokemonNum('kanto');
                expect(pokemons.length).toBe(actualNum);

                // 一番古いゲームバージョンであるか
                pokemons.forEach(({ gameImagePaths }) => {
                    const hasOldGame = gameImagePaths.every(
                        (gameImagePath) =>
                            gameImagePath.includes('/icon/') ||
                            gameImagePath.includes('/rgby/')
                    );
                    expect(hasOldGame).toBeTruthy();
                });

                // 英語のデータであるか（最初の３匹だけで検証する）
                const [bulbasaur, ivysaur, venusaur] = pokemons;
                expect(bulbasaur.name).toBe('Bulbasaur');
                expect(bulbasaur.types).toEqual(['Grass', 'Poison']);
                expect(ivysaur.name).toBe('Ivysaur');
                expect(ivysaur.types).toEqual(['Grass', 'Poison']);
                expect(venusaur.name).toBe('Venusaur');
                expect(venusaur.types).toEqual(['Grass', 'Poison']);

                done();
            });
    });

    test('正常: lang パラメータを送信した際に、指定した言語でのデータが取得できているか', (done) => {
        const queryParam: Readonly<SearchPokemonQueryParam> = {
            lang: 'ja-Hrkt',
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                const pokemons: PokemonSearchResponse[] = response.body;

                // 日本語のデータであるか（最初の３匹だけで検証する）
                const [bulbasaur, ivysaur, venusaur] = pokemons;
                expect(bulbasaur.name).toBe('フシギダネ');
                expect(bulbasaur.types).toEqual(['くさ', 'どく']);
                expect(ivysaur.name).toBe('フシギソウ');
                expect(ivysaur.types).toEqual(['くさ', 'どく']);
                expect(venusaur.name).toBe('フシギバナ');
                expect(venusaur.types).toEqual(['くさ', 'どく']);

                done();
            });
    });

    test('正常: game パラメータを送信した際に、指定したゲームでのデータが取得できているか', (done) => {
        const queryParam: Readonly<SearchPokemonQueryParam> = {
            game: 'gsc',
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                const pokemons: PokemonSearchResponse[] = response.body;

                // 金銀バージョンでの地域（ジョウト地方）のポケモン数であるか
                const actualNum = getRegionPokemonNum('johto');
                expect(pokemons.length).toBe(actualNum);

                // 金銀バージョンであるか
                pokemons.forEach(({ gameImagePaths }) => {
                    const hasOldGame = gameImagePaths.every(
                        (gameImagePath) =>
                            gameImagePath.includes('/icon/') ||
                            gameImagePath.includes('/gsc/')
                    );
                    expect(hasOldGame).toBeTruthy();
                });

                done();
            });
    });

    test('正常: regions パラメータを送信した際に、指定した地域でのデータが取得できているか', (done) => {
        const queryParam: Readonly<SearchPokemonQueryParam> = {
            regions: ['kanto', 'hoenn'],
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                const pokemons: PokemonSearchResponse[] = response.body;

                // カントウ地方＋ホウエン地方のポケモン数であるか
                const actualNum = getRegionPokemonNum('kanto', 'hoenn');
                expect(pokemons.length).toBe(actualNum);

                // 金銀バージョンであるか
                pokemons.forEach(({ gameImagePaths }) => {
                    const hasOldGame = gameImagePaths.every(
                        (gameImagePath) =>
                            gameImagePath.includes('/icon/') ||
                            gameImagePath.includes('/rse/')
                    );
                    expect(hasOldGame).toBeTruthy();
                });

                done();
            });
    });

    test('正常: lang / game / regions パラメータを送信した際に、指定したデータが取得できているか', (done) => {
        const queryParam: Readonly<SearchPokemonQueryParam> = {
            lang: 'ja-Hrkt',
            game: 'bw',
            regions: ['hoenn', 'johto'],
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                const pokemons: PokemonSearchResponse[] = response.body;

                // ジョウト・ホウエン地方でのポケモンの数であるか
                const actualNum = getRegionPokemonNum('johto', 'hoenn');
                expect(pokemons.length).toBe(actualNum);

                // ブラック・ホワイトバージョンであるか
                pokemons.forEach(({ gameImagePaths }) => {
                    const hasOldGame = gameImagePaths.every(
                        (gameImagePath) =>
                            gameImagePath.includes('/icon/') ||
                            gameImagePath.includes('/bw/')
                    );
                    expect(hasOldGame).toBeTruthy();
                });

                // 日本語のデータであるか（最初の３匹だけで検証する）
                const [chikorita, bayleef, meganium] = pokemons;
                expect(chikorita.name).toBe('チコリータ');
                expect(chikorita.types).toEqual(['くさ']);
                expect(bayleef.name).toBe('ベイリーフ');
                expect(bayleef.types).toEqual(['くさ']);
                expect(meganium.name).toBe('メガニウム');
                expect(meganium.types).toEqual(['くさ']);

                done();
            });
    });

    test('異常: lang に不正な値を入れ、リクエストを送信した際 404 となるか', (done) => {
        const queryParam: Readonly<SearchPokemonQueryParam> = {
            lang: 'xxxxx',
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    test('異常: game に不正な値を入れ、リクエストを送信した際 204 となるか', (done) => {
        const queryParam: Readonly<SearchPokemonQueryParam> = {
            game: 'xxxxx',
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect(204, done);
    });

    test('異常: regions に不正な値を入れ、リクエストを送信した際 204 となるか', (done) => {
        const queryParam: Readonly<SearchPokemonQueryParam> = {
            regions: ['xxxxx', 'ooooo'],
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect(204, done);
    });

    test('異常: lang / game / regions とは別のパラメータを設定した場合、一番古いバージョン・地域で英語のデータが取得できているか', (done) => {
        const queryParam: Readonly<any> = {
            xxxx: true,
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                const pokemons: PokemonSearchResponse[] = response.body;

                // 一番古い地域でのポケモンの数であるか
                const actualNum = getRegionPokemonNum('kanto');
                expect(pokemons.length).toBe(actualNum);

                // 一番古いゲームバージョンであるか
                pokemons.forEach(({ gameImagePaths }) => {
                    const hasOldGame = gameImagePaths.every(
                        (gameImagePath) =>
                            gameImagePath.includes('/icon/') ||
                            gameImagePath.includes('/rgby/')
                    );
                    expect(hasOldGame).toBeTruthy();
                });

                // 英語のデータであるか（最初の３匹だけで検証する）
                const [bulbasaur, ivysaur, venusaur] = pokemons;
                expect(bulbasaur.name).toBe('Bulbasaur');
                expect(bulbasaur.types).toEqual(['Grass', 'Poison']);
                expect(ivysaur.name).toBe('Ivysaur');
                expect(ivysaur.types).toEqual(['Grass', 'Poison']);
                expect(venusaur.name).toBe('Venusaur');
                expect(venusaur.types).toEqual(['Grass', 'Poison']);

                done();
            });
    });

    test('異常: regions に配列ではなく文字列を入れてリクエストをした場合に 204 となる', (done) => {
        const queryParam: Readonly<any> = {
            regions: 'xxxxx',
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect(204, done);
    });
});
