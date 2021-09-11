import PokemonEntity from '@/domain/entity/Pokemon.entity';
import IPokemonPresenter from '@/domain/presenter/IPokemon.presenter';
import { toBase64 } from '@/domain/function/mapping-image.function';
import {
    PokemonSearchResponse,
    PokemonSearchResponseData,
} from 'app-response-model';
import { injectable } from 'inversify';

@injectable()
export default class PokemonPresenter implements IPokemonPresenter {
    public async toPokemonSearchResponse(
        hits: number,
        pokemons: PokemonEntity[]
    ): Promise<PokemonSearchResponse> {
        const data = await Promise.all(
            pokemons.map<Promise<PokemonSearchResponseData>>(async (p) => {
                const [{ name: pokemonName }] = p.pokemonNames;
                const types = p.pokemonTypes.map(({ type }) => {
                    const [{ name: typeName }] = type.typeNames;
                    return { code: type.name, name: typeName };
                });

                const pokemonGameImages = await Promise.all(
                    p.pokemonGameImages.map(async (pokemonGameImage) => ({
                        ...pokemonGameImage,
                        path: await toBase64(pokemonGameImage.path),
                    }))
                );
                const gameImagePath = pokemonGameImages.reduce<
                    PokemonSearchResponseData['gameImagePath']
                >(
                    (a, c) => {
                        return c.isMain
                            ? {
                                  ...a,
                                  mainPath: c.path,
                              }
                            : {
                                  ...a,
                                  otherPaths: a.otherPaths.concat([c.path]),
                              };
                    },
                    {
                        mainPath: '',
                        otherPaths: [],
                    } as PokemonSearchResponseData['gameImagePath']
                );

                return {
                    id: p.id,
                    imageColor: p.imageColor,
                    name: pokemonName,
                    gameImagePath,
                    types,
                };
            })
        );

        return {
            hits,
            data,
        };
    }
}
