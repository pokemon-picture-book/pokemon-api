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
                    gameImagePath: p.pokemonGameImages.reduce(
                        (a, c) => {
                            if (c.isMain) {
                                return {
                                    ...a,
                                    mainPath: c.path,
                                };
                            }
                            return {
                                ...a,
                                otherPaths: a.otherPaths.concat([c.path]),
                            };
                        },
                        {
                            mainPath: '',
                            otherPaths: [],
                        } as PokemonSearchResponse['gameImagePath']
                    ),
                    types: p.pokemonTypes.map(({ type }) => {
                        const [{ name: typeName }] = type.typeNames;
                        return { code: type.name, name: typeName };
                    }),
                };
            }
        );
    }
}
