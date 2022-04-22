import IPokemonRepository from '@/02-application/repository/IPokemon.repository';
import driver from '@/04-framework/db/driver';
import PokemonRepository from '@/03-interface/infrastructure/repository/Pokemon.repository';
import { getRegionPokemonNum } from '@test/shared/region';

describe('Unit test for Pokemon repository', () => {
    const repository: IPokemonRepository = new PokemonRepository();

    beforeAll(async () => {
        await driver.connect();
    });

    afterAll(() => {
        driver.close();
    });

    test('正常: languageId を指定した場合、正しい結果が取得できているか', async (done) => {
        const pokemons = await repository.findAll({
            languageId: 1,
            gameVersionGroupId: 1,
            regionIds: [1],
            isPokemonMainImage: true
        });
        const [bulbasaur, ivysaur, venusaur] = pokemons;

        const [{ name: bulbasaurName }] = bulbasaur.pokemonNames;
        const bulbasaurTypes = bulbasaur.pokemonTypes.map(({ type }) => {
            const [{ name: typeName }] = type.typeNames;
            return typeName;
        });
        expect(bulbasaurName).toBe('フシギダネ');
        expect(bulbasaurTypes).toEqual(['くさ', 'どく']);

        const [{ name: ivysaurName }] = ivysaur.pokemonNames;
        const ivysaurTypes = ivysaur.pokemonTypes.map(({ type }) => {
            const [{ name: typeName }] = type.typeNames;
            return typeName;
        });
        expect(ivysaurName).toBe('フシギソウ');
        expect(ivysaurTypes).toEqual(['くさ', 'どく']);

        const [{ name: venusaurName }] = venusaur.pokemonNames;
        const venusaurTypes = venusaur.pokemonTypes.map(({ type }) => {
            const [{ name: typeName }] = type.typeNames;
            return typeName;
        });
        expect(venusaurName).toBe('フシギバナ');
        expect(venusaurTypes).toEqual(['くさ', 'どく']);

        done();
    });

    test('正常: gameVersionGroupId を指定した場合、正しい結果が取得できているか', async (done) => {
        const pokemons = await repository.findAll({
            languageId: 1,
            gameVersionGroupId: 1,
            regionIds: [1],
            isPokemonMainImage: true
        });

        pokemons.forEach(({ pokemonGameImages }) => {
            const hasRgbyGame = pokemonGameImages.every(
                ({ path }) => path.includes('icon') || path.includes('rgby')
            );
            expect(hasRgbyGame).toBeTruthy();
        });

        done();
    });

    test('正常: regionIds を指定した場合、正しい結果が取得できているか', async (done) => {
        const pokemons = await repository.findAll({
            languageId: 1,
            gameVersionGroupId: 2,
            regionIds: [1, 2],
            isPokemonMainImage: true
        });

        const actualNum = getRegionPokemonNum('kanto', 'johto');
        expect(pokemons.length).toBe(actualNum);

        done();
    });

    test('正常: isPokemonMainImage を指定した場合、正しい結果が取得できているか', async (done) => {
        const pokemons = await repository.findAll({
            languageId: 1,
            gameVersionGroupId: 1,
            regionIds: [1],
            isPokemonMainImage: true
        });

        const isAllMainImage = pokemons.every(
            (pokemon) =>
                pokemon.pokemonGameImages.length === 1 &&
                pokemon.pokemonGameImages[0].isMain
        );

        expect(isAllMainImage).toBe(true);

        done();
    });

    test('正常: ID でソートされているか', async (done) => {
        const pokemons = await repository.findAll({
            languageId: 1,
            gameVersionGroupId: 1,
            regionIds: [1],
            isPokemonMainImage: true
        });

        pokemons.forEach((pokemon, i) => {
            expect(pokemon.id).toBe(i + 1);
        });

        done();
    });

    test('正常: 正常に1件検索ができるか', async (done) => {
        const pokemon = await repository.findById(
            {
                id: 1,
                languageId: 1,
                gameVersionGroupId: 1
            },
            true
        );

        expect(pokemon).toBeTruthy();

        done();
    });

    test('異常: languageId に存在しないデータのパラメータを指定した場合、空配列となるか', async (done) => {
        const pokemons = await repository.findAll({
            languageId: 99999,
            gameVersionGroupId: 1,
            regionIds: [1],
            isPokemonMainImage: true
        });
        expect(pokemons.length).toBe(0);
        done();
    });

    test('異常: gameVersionGroupId に存在しないデータのパラメータを指定した場合、空配列となるか', async (done) => {
        const pokemons = await repository.findAll({
            languageId: 1,
            gameVersionGroupId: 99999,
            regionIds: [1],
            isPokemonMainImage: true
        });
        expect(pokemons.length).toBe(0);
        done();
    });

    test('異常: regionIds に存在しないデータのパラメータを指定した場合、空配列となるか', async (done) => {
        const pokemons = await repository.findAll({
            languageId: 1,
            gameVersionGroupId: 1,
            regionIds: [99999],
            isPokemonMainImage: true
        });
        expect(pokemons.length).toBe(0);
        done();
    });
});
