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
        const pokemons = await repository.findAll(1, 1, [1]);

        const [pokemonSearchResponse] = presenter.toPokemonSearchResponse(
            pokemons
        );
        const [actual] = pokemons;

        expect(pokemonSearchResponse.id).toBe(actual.id);
        expect(pokemonSearchResponse.imageColor).toBe(actual.imageColor);
        expect(pokemonSearchResponse.name).toBe(actual.pokemonNames[0].name);
        actual.pokemonGameImages.forEach((gameImage, i) => {
            expect(pokemonSearchResponse.gameImagePaths[i]).toBe(
                gameImage.path
            );
        });
        actual.pokemonImages.forEach((image, i) => {
            expect(pokemonSearchResponse.imagePaths[i]).toBe(image.path);
        });
        actual.pokemonTypes.forEach((type, i) => {
            expect(pokemonSearchResponse.types[i]).toBe(
                type.type.typeNames[0].name
            );
        });

        done();
    });

    test('正常: 正しくマッピングできているか', async (done) => {
        const responses = presenter.toPokemonSearchResponse([]);
        expect(responses.length).toBe(0);
        done();
    });
});
