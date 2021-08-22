import IPokemonPresenter from '@/domain/presenter/IPokemon.presenter';
import IPokemonRepository from '@/domain/repository/IPokemon.repository';
import driver from '@/driver';
import PokemonRepository from '@/infrastructure/repository/Pokemon.repository';
import PokemonPresenter from '@/presenter/Pokemon.presenter';

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
            },
            {}
        );

        const pokemonSearchResponse = presenter.toPokemonSearchResponse(
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

        expect(
            actual.pokemonGameImages.every((pokemonGameImage) => {
                const {
                    mainPath,
                    otherPaths,
                } = pokemonSearchResponseData.gameImagePath;
                return (
                    mainPath === pokemonGameImage.path ||
                    otherPaths.includes(pokemonGameImage.path)
                );
            })
        ).toBeTruthy();
        actual.pokemonTypes.forEach((type, i) => {
            const { code, name } = pokemonSearchResponseData.types[i];
            expect(code).toBe(type.type.name);
            expect(name).toBe(type.type.typeNames[0].name);
        });

        done();
    });

    test('正常: 正しくマッピングできているか', async (done) => {
        const responses = presenter.toPokemonSearchResponse(0, []);
        expect(responses.hits).toBe(0);
        expect(responses.data.length).toBe(0);
        done();
    });
});
