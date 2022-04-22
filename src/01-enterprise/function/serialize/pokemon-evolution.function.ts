import { Pokemon } from 'app-entity';
import { toBase64 } from '@/01-enterprise/function/mapping-image.function';
import { toTypes } from '@/01-enterprise/function/serialize/pokemon-type.function';
import { SearchOnePokemonResponseData } from 'app-response-model';

export const toPokemonDetailEvolutions = async ({
    pokemonEvolutions
}: Pokemon): Promise<SearchOnePokemonResponseData['evolutions']> => {
    if (
        !pokemonEvolutions ||
        (pokemonEvolutions && !pokemonEvolutions.length)
    ) {
        return [];
    }
    return Promise.all(
        pokemonEvolutions.map(async ({ evolution }) => {
            const {
                trigger,
                detail1,
                detail2,
                fromPokemon,
                toPokemon
            } = evolution;
            const [fromPokemonName] = fromPokemon.pokemonNames;
            const [toPokemonName] = toPokemon.pokemonNames;
            const [fromPokemonGameImage] = fromPokemon.pokemonGameImages;
            const [toPokemonGameImage] = toPokemon.pokemonGameImages;
            return {
                trigger,
                detail1,
                detail2,
                fromPokemon: {
                    id: fromPokemon.id,
                    imageColor: fromPokemon.imageColor,
                    pokemonName: fromPokemonName.name,
                    gameImagePath: fromPokemonGameImage
                        ? await toBase64(fromPokemonGameImage.path)
                        : '',
                    types: toTypes(fromPokemon.pokemonTypes)
                },
                toPokemon: {
                    id: toPokemon.id,
                    imageColor: toPokemon.imageColor,
                    pokemonName: toPokemonName.name,
                    gameImagePath: toPokemonGameImage
                        ? await toBase64(toPokemonGameImage.path)
                        : '',
                    types: toTypes(toPokemon.pokemonTypes)
                }
            };
        })
    );
};

export default {
    toPokemonDetailEvolutions
};
