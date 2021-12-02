import { base64RegExp } from '@test/shared/image';
import IPokemonPresenter from '@/02-application/presenter/IPokemon.presenter';
import IPokemonRepository from '@/02-application/repository/IPokemon.repository';
import driver from '@/04-framework/db/driver';
import PokemonRepository from '@/03-interface/infrastructure/repository/Pokemon.repository';
import PokemonPresenter from '@/03-interface/presenter/Pokemon.presenter';

describe('Unit test for Pokemon presenter', () => {
    const presenter: IPokemonPresenter = new PokemonPresenter();

    const repository: IPokemonRepository = new PokemonRepository();

    beforeAll(async () => {
        await driver.connect();
    });

    afterAll(() => {
        driver.close();
    });

    test('正常: 正しくマッピングできているか', async (done) => {
        const pokemons = await repository.findAll(
            {
                languageId: 1,
                gameVersionGroupId: 1,
                regionIds: [1],
                isPokemonMainImage: true,
            },
            {}
        );

        const pokemonSearchResponse = await presenter.toPokemonSearchResponse(
            pokemons.length,
            pokemons
        );
        const [pokemonSearchResponseData] = pokemonSearchResponse.data;
        const [actual] = pokemons;

        expect(pokemonSearchResponse.hits).toBe(pokemons.length);

        expect(pokemonSearchResponseData.id).toBe(actual.id);
        expect(pokemonSearchResponseData.imageColor).toBe(actual.imageColor);
        expect(pokemonSearchResponseData.name).toBe(
            actual.pokemonNames[0].name
        );

        // base64 にエンコードされているか
        const isBase64Format = base64RegExp.test(
            pokemonSearchResponseData.gameImagePath
        );
        expect(isBase64Format).toBe(true);

        actual.pokemonTypes.forEach((type, i) => {
            const { code, name } = pokemonSearchResponseData.types[i];
            expect(code).toBe(type.type.name);
            expect(name).toBe(type.type.typeNames[0].name);
        });

        done();
    });

    test('正常: 正しくマッピングできているか', async (done) => {
        const responses = await presenter.toPokemonSearchResponse(0, []);
        expect(responses.hits).toBe(0);
        expect(responses.data.length).toBe(0);
        done();
    });
});
