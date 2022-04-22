import { SearchOnePokemonResponseData } from 'app-response-model';
import { Pokemon } from 'app-entity';
import { toBase64 } from '@/01-enterprise/function/mapping-image.function';

export const toPokemonDetailImage = async ({
    pokemonGameImages,
    pokemonFootmarkImages
}: Pokemon): Promise<SearchOnePokemonResponseData['image']> => {
    const mainGameImage = pokemonGameImages.find(({ isMain }) => isMain);
    const handheldIconImages = pokemonGameImages.filter(
        ({ isHandheldIcon }) => isHandheldIcon
    );
    const shinyImages = pokemonGameImages.filter(({ isShiny }) => isShiny);
    const otherImages = pokemonGameImages.filter(
        ({ isMain, isHandheldIcon, isShiny }) =>
            !(isMain || isHandheldIcon || isShiny)
    );

    const base64FootmarkImages = await Promise.all(
        pokemonFootmarkImages.map(async (pokemonFootmarkImage) =>
            toBase64(pokemonFootmarkImage.path)
        )
    );
    const base64HandheldIconImages = await Promise.all(
        handheldIconImages.map(async (handheldIconImage) =>
            toBase64(handheldIconImage.path)
        )
    );
    const base64ShinyImages = await Promise.all(
        shinyImages.map(async (shinyImage) => toBase64(shinyImage.path))
    );
    const base64OtherImages = await Promise.all(
        otherImages.map(async (otherImage) => toBase64(otherImage.path))
    );

    return {
        mainGameImage: mainGameImage ? await toBase64(mainGameImage.path) : '',
        footmarkImages: base64FootmarkImages,
        handheldIconImages: base64HandheldIconImages,
        shinyImages: base64ShinyImages,
        otherImages: base64OtherImages
    };
};

export default {
    toPokemonDetailImage
};
