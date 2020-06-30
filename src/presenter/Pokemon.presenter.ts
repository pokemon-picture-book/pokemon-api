import { injectable } from 'inversify';
import IPokemonPresenter from '@/domain/presenter/IPokemon.presenter';
import PokemonEntity from '@/domain/entity/Pokemon.entity';
import { PokemonSearchResponse } from '@t/response-model';

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
                        pokemonGameImage => pokemonGameImage.path
                    ),
                    imagePaths: p.pokemonImages.map(
                        pokemonImage => pokemonImage.path
                    ),
                    types: p.pokemonTypes.map(({ type }) => {
                        const [{ name: typeName }] = type.typeNames;
                        return typeName;
                    })
                };
            }
        );
    }
}
