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

                const gameImagePath = p.pokemonGameImages.find(
                    (pokemonGameImage) => pokemonGameImage.isMain
                );

                return {
                    id: p.id,
                    imageColor: p.imageColor,
                    name: pokemonName,
                    gameImagePath: gameImagePath
                        ? await toBase64(gameImagePath.path)
                        : '',
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
