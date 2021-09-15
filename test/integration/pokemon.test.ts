import driver from '@/driver';
import { ROUTING } from '@/routes';
import server from '@/server';
import { getRegionPokemonNum } from '@test/shared/region';
import { base64RegExp } from '@test/shared/image';
import { LIMIT_MAX_NUM } from '@/domain/constant/pagination';
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
                const pokemons: PokemonSearchResponse = response.body;

                // 一番古い地域でのポケモンの数であるか
                const actualNum = getRegionPokemonNum('kanto');
                expect(pokemons.hits).toBe(actualNum);
                expect(pokemons.data.length).toBe(LIMIT_MAX_NUM);

                // base64 にエンコードされているか
                pokemons.data.forEach(({ gameImagePath }) => {
                    const isBase64Format = base64RegExp.test(gameImagePath);
                    expect(isBase64Format).toBe(true);
                });

                // 英語のデータであるか（最初の３匹だけで検証する）
                const [bulbasaur, ivysaur, venusaur] = pokemons.data;
                expect(bulbasaur.name).toBe('Bulbasaur');
                const [bulbasaurGrass, bulbasaurPoison] = bulbasaur.types;
                expect(bulbasaurGrass.code).toEqual('grass');
                expect(bulbasaurGrass.name).toEqual('Grass');
                expect(bulbasaurPoison.code).toEqual('poison');
                expect(bulbasaurPoison.name).toEqual('Poison');
                expect(ivysaur.name).toBe('Ivysaur');
                const [ivysaurGrass, ivysaurPoison] = ivysaur.types;
                expect(ivysaurGrass.code).toEqual('grass');
                expect(ivysaurGrass.name).toEqual('Grass');
                expect(ivysaurPoison.code).toEqual('poison');
                expect(ivysaurPoison.name).toEqual('Poison');
                expect(venusaur.name).toBe('Venusaur');
                const [venusaurGrass, venusaurPoison] = venusaur.types;
                expect(venusaurGrass.code).toEqual('grass');
                expect(venusaurGrass.name).toEqual('Grass');
                expect(venusaurPoison.code).toEqual('poison');
                expect(venusaurPoison.name).toEqual('Poison');

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
                const pokemons: PokemonSearchResponse = response.body;

                // 日本語のデータであるか（最初の３匹だけで検証する）
                const [bulbasaur, ivysaur, venusaur] = pokemons.data;
                expect(bulbasaur.name).toBe('フシギダネ');
                const [bulbasaurGrass, bulbasaurPoison] = bulbasaur.types;
                expect(bulbasaurGrass.code).toEqual('grass');
                expect(bulbasaurGrass.name).toEqual('くさ');
                expect(bulbasaurPoison.code).toEqual('poison');
                expect(bulbasaurPoison.name).toEqual('どく');
                expect(ivysaur.name).toBe('フシギソウ');
                const [ivysaurGrass, ivysaurPoison] = ivysaur.types;
                expect(ivysaurGrass.code).toEqual('grass');
                expect(ivysaurGrass.name).toEqual('くさ');
                expect(ivysaurPoison.code).toEqual('poison');
                expect(ivysaurPoison.name).toEqual('どく');
                expect(venusaur.name).toBe('フシギバナ');
                const [venusaurGrass, venusaurPoison] = venusaur.types;
                expect(venusaurGrass.code).toEqual('grass');
                expect(venusaurGrass.name).toEqual('くさ');
                expect(venusaurPoison.code).toEqual('poison');
                expect(venusaurPoison.name).toEqual('どく');

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
                const pokemons: PokemonSearchResponse = response.body;

                // 金銀バージョンでの地域（ジョウト地方）のポケモン数であるか
                const actualNum = getRegionPokemonNum('johto');
                expect(pokemons.hits).toBe(actualNum);
                expect(pokemons.data.length).toBe(LIMIT_MAX_NUM);

                // base64 にエンコードされているか
                pokemons.data.forEach(({ gameImagePath }) => {
                    const isBase64Format = base64RegExp.test(gameImagePath);
                    expect(isBase64Format).toBe(true);
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
                const pokemons: PokemonSearchResponse = response.body;

                // カントウ地方＋ホウエン地方のポケモン数であるか
                const actualNum = getRegionPokemonNum('kanto', 'hoenn');
                expect(pokemons.hits).toBe(actualNum);
                expect(pokemons.data.length).toBe(LIMIT_MAX_NUM);

                // base64 にエンコードされているか
                pokemons.data.forEach(({ gameImagePath }) => {
                    const isBase64Format = base64RegExp.test(gameImagePath);
                    expect(isBase64Format).toBe(true);
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
                const pokemons: PokemonSearchResponse = response.body;

                // ジョウト・ホウエン地方でのポケモンの数であるか
                const actualNum = getRegionPokemonNum('johto', 'hoenn');
                expect(pokemons.hits).toBe(actualNum);
                expect(pokemons.data.length).toBe(LIMIT_MAX_NUM);

                // base64 にエンコードされているか
                pokemons.data.forEach(({ gameImagePath }) => {
                    const isBase64Format = base64RegExp.test(gameImagePath);
                    expect(isBase64Format).toBe(true);
                });

                // 日本語のデータであるか（最初の３匹だけで検証する）
                const [chikorita, bayleef, meganium] = pokemons.data;
                expect(chikorita.name).toBe('チコリータ');
                const [chikoritaGrass] = chikorita.types;
                expect(chikoritaGrass.code).toEqual('grass');
                expect(chikoritaGrass.name).toEqual('くさ');
                expect(bayleef.name).toBe('ベイリーフ');
                const [bayleefGrass] = bayleef.types;
                expect(bayleefGrass.code).toEqual('grass');
                expect(bayleefGrass.name).toEqual('くさ');
                expect(meganium.name).toBe('メガニウム');
                const [meganiumGrass] = meganium.types;
                expect(meganiumGrass.code).toEqual('grass');
                expect(meganiumGrass.name).toEqual('くさ');

                done();
            });
    });

    test('異常: lang に不正な値を入れ、リクエストを送信した際 400 となるか', (done) => {
        const queryParam: Readonly<SearchPokemonQueryParam> = {
            lang: 'xxxxx',
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    test('異常: game に不正な値を入れ、リクエストを送信した際一番古い地域でのポケモンの数であるか', (done) => {
        const queryParam: Readonly<SearchPokemonQueryParam> = {
            game: 'xxxxx',
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                const pokemons: PokemonSearchResponse = response.body;

                // 一番古い地域でのポケモンの数であるか
                const actualNum = getRegionPokemonNum('kanto');
                expect(pokemons.hits).toBe(actualNum);
                expect(pokemons.data.length).toBe(LIMIT_MAX_NUM);

                done();
            });
    });

    test('異常: regions に不正な値を入れ、リクエストを送信した際一番古い地域でのポケモンの数であるか', (done) => {
        const queryParam: Readonly<SearchPokemonQueryParam> = {
            regions: ['xxxxx', 'ooooo'],
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                const pokemons: PokemonSearchResponse = response.body;

                // 一番古い地域でのポケモンの数であるか
                const actualNum = getRegionPokemonNum('kanto');
                expect(pokemons.hits).toBe(actualNum);
                expect(pokemons.data.length).toBe(LIMIT_MAX_NUM);

                done();
            });
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
                const pokemons: PokemonSearchResponse = response.body;

                // 一番古い地域でのポケモンの数であるか
                const actualNum = getRegionPokemonNum('kanto');
                expect(pokemons.hits).toBe(actualNum);
                expect(pokemons.data.length).toBe(LIMIT_MAX_NUM);

                // base64 にエンコードされているか
                pokemons.data.forEach(({ gameImagePath }) => {
                    const isBase64Format = base64RegExp.test(gameImagePath);
                    expect(isBase64Format).toBe(true);
                });

                // 英語のデータであるか（最初の３匹だけで検証する）
                const [bulbasaur, ivysaur, venusaur] = pokemons.data;
                expect(bulbasaur.name).toBe('Bulbasaur');
                const [bulbasaurGrass, bulbasaurPoison] = bulbasaur.types;
                expect(bulbasaurGrass.code).toEqual('grass');
                expect(bulbasaurGrass.name).toEqual('Grass');
                expect(bulbasaurPoison.code).toEqual('poison');
                expect(bulbasaurPoison.name).toEqual('Poison');
                expect(ivysaur.name).toBe('Ivysaur');
                const [ivysaurGrass, ivysaurPoison] = ivysaur.types;
                expect(ivysaurGrass.code).toEqual('grass');
                expect(ivysaurGrass.name).toEqual('Grass');
                expect(ivysaurPoison.code).toEqual('poison');
                expect(ivysaurPoison.name).toEqual('Poison');
                expect(venusaur.name).toBe('Venusaur');
                const [venusaurGrass, venusaurPoison] = venusaur.types;
                expect(venusaurGrass.code).toEqual('grass');
                expect(venusaurGrass.name).toEqual('Grass');
                expect(venusaurPoison.code).toEqual('poison');
                expect(venusaurPoison.name).toEqual('Poison');

                done();
            });
    });

    test('異常: regions に配列ではなく文字列を入れてリクエストをした場合に一番古い地域でのポケモンの数であるか', (done) => {
        const queryParam: Readonly<any> = {
            regions: 'xxxxx',
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                const pokemons: PokemonSearchResponse = response.body;

                // 一番古い地域でのポケモンの数であるか
                const actualNum = getRegionPokemonNum('kanto');
                expect(pokemons.hits).toBe(actualNum);
                expect(pokemons.data.length).toBe(LIMIT_MAX_NUM);

                done();
            });
    });

    test('offset に整数を指定してリクエストした場合、その offset からのデータが取得できているか', (done) => {
        const queryParam: Readonly<any> = {
            offset: 4,
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                const pokemons: PokemonSearchResponse = response.body;

                // 一番古い地域でのポケモンの数であるか
                const actualNum = getRegionPokemonNum('kanto');
                expect(pokemons.hits).toBe(actualNum);
                expect(pokemons.data.length).toBe(LIMIT_MAX_NUM);

                // 英語のデータであるか（最初の３匹だけで検証する）
                const [charmander, charmeleon, charizard] = pokemons.data;
                expect(charmander.id).toBe(4);
                expect(charmander.name).toBe('Charmander');
                expect(charmeleon.id).toBe(5);
                expect(charmeleon.name).toBe('Charmeleon');
                expect(charizard.id).toBe(6);
                expect(charizard.name).toBe('Charizard');

                done();
            });
    });

    test('offset に hits 数よりも大きい数値を指定した場合、data は空配列となっているか', (done) => {
        const queryParam: Readonly<any> = {
            offset: 152,
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                const pokemons: PokemonSearchResponse = response.body;

                // 一番古い地域でのポケモンの数であるか
                const actualNum = getRegionPokemonNum('kanto');
                expect(pokemons.hits).toBe(actualNum);
                expect(pokemons.data.length).toBe(0);

                done();
            });
    });

    test('offset に文字列を指定した場合、bad request となるか', (done) => {
        const queryParam: Readonly<any> = {
            offset: 'xxxxx',
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    test('offset に Number.MAX_SAFE_INTEGER よりも大きい数値を指定した場合、bad request となるか', (done) => {
        const queryParam: Readonly<any> = {
            offset: Number.MAX_SAFE_INTEGER + 1,
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    test('offset に負の数を指定した場合、bad request となるか', (done) => {
        const queryParam: Readonly<any> = {
            offset: -1,
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    test('limit に整数を指定してリクエストした場合、その limit 数分のデータが取得できているか', (done) => {
        const queryParam: Readonly<any> = {
            limit: 3,
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                const pokemons: PokemonSearchResponse = response.body;

                // 一番古い地域でのポケモンの数であるか
                const actualNum = getRegionPokemonNum('kanto');
                expect(pokemons.hits).toBe(actualNum);
                expect(pokemons.data.length).toBe(queryParam.limit);

                // 英語のデータであるか（最初の３匹だけで検証する）
                const [bulbasaur, ivysaur, venusaur] = pokemons.data;
                expect(bulbasaur.id).toBe(1);
                expect(bulbasaur.name).toBe('Bulbasaur');
                expect(ivysaur.id).toBe(2);
                expect(ivysaur.name).toBe('Ivysaur');
                expect(venusaur.id).toBe(3);
                expect(venusaur.name).toBe('Venusaur');

                done();
            });
    });

    test('limit に hits 数よりも大きい数値を指定した場合、data にはヒットした分のデータが取得できているか', (done) => {
        const queryParam: Readonly<any> = {
            limit: 100,
            regions: ['kalos'],
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                const pokemons: PokemonSearchResponse = response.body;

                // 一番古い地域でのポケモンの数であるか
                const actualNum = getRegionPokemonNum('kalos');
                expect(pokemons.hits).toBe(actualNum);
                expect(pokemons.data.length).toBe(actualNum);

                done();
            });
    });

    test('limit に文字列を指定した場合、bad request となるか', (done) => {
        const queryParam: Readonly<any> = {
            limit: 'xxxxx',
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    test('limit に 100 よりも大きい数値を指定した場合、bad request となるか', (done) => {
        const queryParam: Readonly<any> = {
            limit: 101,
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    test('limit に負の数を指定した場合、bad request となるか', (done) => {
        const queryParam: Readonly<any> = {
            limit: -1,
        };
        request(server)
            .get(`${ROUTING.API}${ROUTING.POKEMON}`)
            .query(queryParam)
            .expect('Content-Type', /json/)
            .expect(400, done);
    });
});
