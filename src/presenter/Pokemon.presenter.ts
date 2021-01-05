import PokemonEntity from '@/domain/entity/Pokemon.entity';
import IPokemonPresenter from '@/domain/presenter/IPokemon.presenter';
import { PokemonSearchResponse } from 'app-response-model';
import { injectable } from 'inversify';

@injectable()
export default class PokemonPresenter implements IPokemonPresenter {
    public toPokemonSearchResponse(
        pokemons: PokemonEntity[]
    ): PokemonSearchResponse[] {
        return pokemons.map(
            (p): PokemonSearchResponse => {
                const [{ name: pokemonName }] = p.pokemonNames;
                return {
                    id: p.id,
                    imageColor: p.imageColor,
                    name: pokemonName,
                    gameImagePaths: p.pokemonGameImages.map(
                        (pokemonGameImage) => pokemonGameImage.path
                    ),
                    imagePaths: p.pokemonImages.map(
                        (pokemonImage) => pokemonImage.path
                    ),
                    types: p.pokemonTypes.map(({ type }) => {
                        const [{ name: typeName }] = type.typeNames;
                        return typeName;
                    }),
                };
            }
        );
    }
}
