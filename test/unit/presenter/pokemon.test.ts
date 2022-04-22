import { base64RegExp } from '@test/shared/image';
import IPokemonPresenter from '@/02-application/presenter/IPokemon.presenter';
import IPokemonRepository from '@/02-application/repository/IPokemon.repository';
import driver from '@/04-framework/db/driver';
import PokemonRepository from '@/03-interface/infrastructure/repository/Pokemon.repository';
import PokemonPresenter from '@/03-interface/presenter/Pokemon.presenter';
import PokemonEntity from '@/01-enterprise/entity/Pokemon.entity';
import { SearchOnePokemonResponseData } from 'app-response-model';

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
        const pokemons = await repository.findAll({
            languageId: 1,
            gameVersionGroupId: 1,
            regionIds: [1],
            isPokemonMainImage: true
        });

        const pokemonSearchResponse = await presenter.toSearchAllPokemonResponse(
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
        const responses = await presenter.toSearchAllPokemonResponse(0, []);
        expect(responses.hits).toBe(0);
        expect(responses.data.length).toBe(0);
        done();
    });

    test('正常: 1件データに対し正しくマッピングできてるか', async (done) => {
        const pokemon = (await repository.findById(
            {
                id: 1,
                languageId: 1,
                gameVersionGroupId: 1
            },
            true
        )) as PokemonEntity;

        const {
            data: response,
            prevId,
            nextId
        } = await presenter.toSearchOnePokemonResponse(pokemon, {
            prevId: 151,
            nextId: 2
        });

        expect(prevId).toBe(151);
        expect(nextId).toBe(2);

        expect(Object.keys(response).length).toBe(11);

        expect(response.id).toBe(pokemon.id);
        expect(response.height).toBe(pokemon.height);
        expect(response.weight).toBe(pokemon.weight);
        expect(response.imageColor).toBe(pokemon.imageColor);
        expect(response.flavorText).toBe(
            pokemon.flavorTextEntries[0].flavorText
        );
        expect(response.genus).toBe(pokemon.generas[0].genus);
        expect(response.pokemonName).toBe(pokemon.pokemonNames[0].name);

        (Object.keys(
            response.status
        ) as (keyof SearchOnePokemonResponseData['status'])[]).forEach(
            (statusKey) => {
                expect(response.status[statusKey]).toBe(
                    pokemon.status[statusKey]
                );
            }
        );

        response.types.forEach((type, index) => {
            expect(type.code).toBe(pokemon.pokemonTypes[index].type.name);
            expect(type.name).toBe(
                pokemon.pokemonTypes[index].type.typeNames[0].name
            );
        });

        expect(Object.keys(response.image).length).toBe(5);

        expect(response.evolutions.length).toBe(2);

        done();
    });
});
